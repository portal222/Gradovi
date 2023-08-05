import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import SearchBox from "./SearchBox";
import GlobalContext from "./GlobalContext";
import SearchPlace from "./SearchPlace";
import BackToTop from "./BackToTop";

const SearchResutsFlag = () => {
    const [error, setError] = useState(null);
    const [countries, setCountries] = useState([]);

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

            setCountries(filterData);
        } catch (err) {
            setError(err);
        }

    };

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        
            <table className="tabelaZemlje">
                <thead >

                    <tr>
                        <th colSpan={2}>
                            <SearchPlace />
                        </th>
                    </tr>

                </thead>

                {countries.map((dataObj) => (



                    <tbody key={dataObj.name.common} >

                        <tr >

                          
                            <td  colSpan={2} className="flag"><img src={dataObj.flags.png} alt="flag" 
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
                <p>{<BackToTop />}</p>
            </table>
       
    );
};
export default SearchResutsFlag;