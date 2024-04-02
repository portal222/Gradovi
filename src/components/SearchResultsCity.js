import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import SearchBoxCity from "./SearchBoxCity";
import GlobalContext from "./GlobalContext";
import SearchPlace from "./SearchPlace";
import BackToTop from "./BackToTop";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import datas from "../../public/city.listDugacak.json";


const SearchResultsCity = () => {
    const [error, setError] = useState(null);
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState([]);


    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    const navigate = useNavigate();


    useEffect(() => {
        getCountries(searchStringValue);
    }, [searchStringValue]);



    const getCountries = (searchStringValue) => {

        try {

            const filterData = datas.filter((city) => {
                return (
                    city.name.toLowerCase().includes(searchStringValue.toLowerCase())

                )

            });
            console.log("spisak gradova", datas);
            console.log("Pretraga gradova", filterData);
            setIsLoading(false);

            setCountries(filterData);
            setResults(filterData.length);
        } catch (err) {
            setError(err);
            setIsLoading(false);
        }
    };

    const handleClickCity = (cityId) => {
        console.log("klik na grad", cityId);
        const LinkTo = `citiesDetails/${cityId}`;
        navigate(LinkTo);
    }
    // const handleClickCountry = (drId) => {
    //     console.log("klik na drzavu",drId);
    //     const LinkTo = `gradoviDetalj/${drId}`;
    //     navigate(LinkTo);
    // } 

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
                            <th>Nothing found</th>
                        </tr>
                    </thead>
                </table></>
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
                        <th colSpan={2}>Number of cities {results}</th>

                    </tr>

                </thead>

                {countries.map((dataObj) => (



                    <tbody key={dataObj.id} >




                        <tr>
                            <td className="nameGeog"
                                onClick={() => handleClickCity(dataObj.name)}>
                                {dataObj.name}</td>
                            <td >
                                {dataObj.country}
                            </td>

                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <hr></hr>
                            </td>
                        </tr>



                    </tbody>

                ))}
            </table>
            <div>{<BackToTop />}</div>
        </>

    );
};
export default SearchResultsCity;