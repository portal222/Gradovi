import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import SearchBoxCity from "./SearchBoxCity";
import GlobalContext from "./GlobalContext";
import SearchPlace from "./SearchPlace";
import BackToTop from "./BackToTop";
import Loader from "./Loader";


const SearchResultsCity = () => {
    const [error, setError] = useState(null);
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState([]);


    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getCountries(searchStringValue);
    }, [searchStringValue]);

    const getCountries = async (searchStringValue) => {
        const url = "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json";

        try {
            const response = await axios.get(url);
            const data = response.data;
            const filterData = data.filter((country) => {
                return (
                    country.name.toLowerCase().includes(searchStringValue.toLowerCase())

                )

            });
            console.log("spisak gradova", data);
            console.log("Pretraga gradova", filterData);
            setIsLoading(false);

            setCountries(filterData);
            setResults(filterData.length);
        } catch (err) {
            setError(err);
            setIsLoading(false);

        }

    };

    if (isLoading) {
        return <Loader />
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
                        <th>Number of cities</th>
                        <th>{results}</th>
                    </tr>

                </thead>

                {countries.map((dataObj) => (



                    <tbody key={dataObj.geonameid} >



                        <tr>
                            <td >Name:</td>
                            <td className="nameComm">{dataObj.name}</td>

                        </tr>
                        <tr>
                            <td >Country:</td>
                            <td className="nameOff">{dataObj.country}</td>
                        </tr>
                        <tr>
                            <td className="lonLat">Subcountry:</td>
                            <td className="lonLat">
                                {dataObj.subcountry}</td>
                        </tr>


                    </tbody>

                ))}
            </table>
            <div>{<BackToTop />}</div>
        </>

    );
};
export default SearchResultsCity;