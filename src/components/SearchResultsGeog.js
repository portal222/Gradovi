import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import SearchPlace from "./SearchPlace";
import GlobalContext from "./GlobalContext";
import BackToTop from "./BackToTop";
import Loader from "./Loader";
import { useNavigate, useParams } from "react-router-dom";
import SearchBox from "./SearchBox";


import MapTwoToneIcon from '@mui/icons-material/MapTwoTone';


const SearchResutsGeog = () => {
    const [error, setError] = useState(null);
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState([]);

    const navigate = useNavigate();



    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getCountries(searchStringValue);
    }, [searchStringValue]);

    const getCountries = async (searchStringValue) => {
        const url = "https://restcountries.com/v3.1/all";

        try {
            const response = await axios.get(url);
            const data = response.data;
            const filterData = data.filter((country) => {
                return (

                    country.name.common.toLowerCase().includes(searchStringValue.toLowerCase())




                );
            });
            console.log("Pretraga", filterData);
            setIsLoading(false);

            setCountries(filterData);
            setResults(filterData.length);
        } catch (err) {
            setError(err);
            setIsLoading(false);
        }

    };

    const handleClick = (drId) => {
        console.log("klik na drz", drId);
        const LinkTo = `detalji/${drId}`;
        navigate(LinkTo);
    }
    const handleClickCity = (cityId) => {
        console.log("klik na glavni grad", cityId);
        const LinkTo = `cities/${cityId}`;
        navigate(LinkTo);
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


                    <tr className="results">
                        <th colSpan={2}>Number of countries: {results}</th>

                    </tr>

                </thead>

                {countries.map((dataObj) => (



                    <tbody key={dataObj.idd.suffixes} >

                        <tr >

                            <td
                            ><img className="imageTwo" src={dataObj.coatOfArms.png}

                                alt=" coat" /></td>
                            <td onClick={() => handleClick(dataObj.name.common)}
                                className="flag" >
                                <img src={dataObj.flags.png} alt="flag"
                                    className="imageFl" /></td>
                        </tr>
                        <tr>
                            <td className="region">Name:</td>
                            <td
                                onClick={() => handleClick(dataObj.name.common)}
                                className="nameGeog">
                                {dataObj.name.common}</td>

                        </tr>


                        <tr>
                            <td className="region">Capital:</td>
                            <td
                                onClick={() => handleClickCity(dataObj.capital[0])}
                                className="nameOffCountry">{dataObj.capital[0]}</td>
                        </tr>
                        <tr>
                            <td className="region">Region:</td>
                            <td className="lang">{dataObj.region}</td>
                        </tr>

                        <tr >
                            <td className="region">Population:</td>
                            <td className="population">{dataObj.population}</td>
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
export default SearchResutsGeog;