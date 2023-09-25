import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import SearchBox from "./SearchBox";
import GlobalContext from "./GlobalContext";
import SearchPlace from "./SearchPlace";
import BackToTop from "./BackToTop";
import Loader from "./Loader";


const SearchResutsFlag = () => {
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
        const url = "https://restcountries.com/v3.1/all";

        try {
            const response = await axios.get(url);
            const data = response.data;
            const filterData = data.filter((country) => {
                return (
                    country.flags.alt?.toLowerCase().includes(searchStringValue.toLowerCase())


                );
            });
            console.log("Pretraga zastava", filterData);
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
                        <th>Number of countries:</th>
                        <th>{results}</th>
                    </tr>

                </thead>

                {countries.map((dataObj) => (



                    <tbody key={dataObj.name.common} >

                        <tr >


                            <td colSpan={2} className="flag"><img src={dataObj.flags.png} alt="flag"
                                className="imageFlsearch" /></td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="flagAlt">
                                <p>{dataObj.flags.alt}</p>
                            </td>
                        </tr>
                        <tr>
                            <td >Name:</td>
                            <td className="nameComm">{dataObj.name.common}</td>

                        </tr>



                        <tr className="region">
                            <td >Subregion:</td>
                            <td >{dataObj.subregion}</td>
                        </tr>



                    </tbody>

                ))}
            </table>
            <div>{<BackToTop />}</div>
        </>

    );
};
export default SearchResutsFlag;