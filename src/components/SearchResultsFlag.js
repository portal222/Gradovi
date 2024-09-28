import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import GlobalContext from "./GlobalContext";
import SearchPlace from "./SearchPlace";
import BackToTop from "./BackToTop";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import NyTimes from "./NyTimes";

const SearchResutsFlag = () => {

    const [error, setError] = useState(null);
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [nytCity, setNytCity] = useState([]);

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;
    const navigate = useNavigate();

    console.log("searchStringvalue", searchStringValue)

    useEffect(() => {
        getCountries(searchStringValue);
        getTimes(searchStringValue);
    }, [searchStringValue]);

    const getCountries = async (searchStringValue) => {
        const url = "https://restcountries.com/v3.1/all";

        try {
            const response = await axios.get(url);
            const data = response.data;
            const filterData = data.filter((country) => {
                return (
                    country.flags.alt?.toLowerCase().includes(searchStringValue.toLowerCase())
                );
            });
            setIsLoading(false);
            setCountries(filterData);
            setResults(filterData.length);
        } catch (err) {
            setError(err);
            setIsLoading(false);
        }
    };

    const handleClick = (drId) => {
        console.log("klik na drzavu", drId);
        const LinkTo = `flags/${drId}`;
        navigate(LinkTo);
    }


    const getTimes = async (searchStringValue) => {
        const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchStringValue}&api-key=GmsdDOX2JjxHcopan54o6M2dgET0H2hp`

        const response = await fetch(url);
        const data = await response.json();
        console.log(" podaci NYT iz zastava ", data.response.docs);
        setNytCity(data.response.docs);
    }

    if (isLoading) {
        return <Loader />
    } else if (results == 0) {
        return (
            <>
                <table className="tabelaZemlje">
                    <thead>
                        <tr>
                            <th><SearchPlace /></th>
                        </tr>
                        <tr>
                            <th>Nothing found for flag</th>
                        </tr>
                    </thead>
                </table>
                <NyTimes news={nytCity} />
            </>
        )
    }

    return (
        <>
            <table className="tabelaZemlje">
                <thead >
                    <tr>
                        <th colSpan={2}>
                            <SearchPlace />
                        </th>
                    </tr>
                    <tr className="results">
                        <th>Number of countries:</th>
                        <th>{results}</th>
                    </tr>
                </thead>
                {countries.map((dataObj) => (
                    <tbody key={dataObj.name.common} >
                        <tr >
                            <td colSpan={2}
                                onClick={() => handleClick(dataObj.name.common)} className="flag">
                                <img src={dataObj.flags.png} alt="flag"
                                    className="imageFlsearch" /></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <p className="flagAlt" >{dataObj.flags.alt}</p>
                            </td>
                        </tr>
                        <tr>
                            <td className="region" >Name:</td>
                            <td className="nameCommClick"
                                onClick={() => handleClick(dataObj.name.common)}>
                                {dataObj.name.common}</td>
                        </tr>
                        <tr >
                            <td className="region">Subregion:</td>
                            <td className="region">{dataObj.subregion}</td>
                        </tr>
                        <tr><td colSpan={2}>
                            <hr></hr></td>
                        </tr>
                    </tbody>
                ))}
            </table>
            <NyTimes news={nytCity} />
            <div>{<BackToTop />}</div>
        </>
    );
};
export default SearchResutsFlag;