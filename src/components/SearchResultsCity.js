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


    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getCountries(searchStringValue);
    }, [searchStringValue]);

    const getCountries = async (searchStringValue) => {
        const url = "./cityShort.json";

        try {
            const response = await axios.get(url);
            const data = response.data;
            const filterData = data.filter((country) => {
                return (
                 country.name.toLowerCase().includes(searchStringValue.toLowerCase())

                )
                
            });
        console.log("Pretraga gradova", filterData);
        setIsLoading(false);

            setCountries(filterData);
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

                </thead>

                {countries.map((dataObj) => (



                    <tbody key={dataObj.id} >

                 
                     
                        <tr>
                            <td >Name:</td>
                            <td className="nameComm">{dataObj.name}</td>

                        </tr>
                        <tr>
                            <td >Country:</td>
                            <td className="nameOff">{dataObj.country + " " + dataObj.state}</td>
                        </tr>
                        <tr>
                            <td>Position:</td>
                            <td className="lonLat">
                                {dataObj.coord.lat + " " + dataObj.coord.lon}</td>
                        </tr>

             
                    </tbody>

                ))}
            </table>
                <div>{<BackToTop />}</div>
                </>
       
    );
};
export default SearchResultsCity;