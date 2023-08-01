import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import SearchBox from "./SearchBox";
import GlobalContext from "./GlobalContext";

const SearchResutsGeog = () => {
    const [error, setError] = useState(null);
    const [countries, setCountries] = useState([]);


    const params = useParams();
    const countryId = params.countryId;

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getCountries();
    }, []);

    const getCountries = async () => {
        const url = "https://restcountries.com/v3.1/all/${zemlja}";

        try {
            const response = await axios.get(url);
            const data = response.data;
        
        console.log("Detalji", data);

            setCountries(data);
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
                            <SearchBox placeholder={'Search Country'} linkTo={'/geografija/search'} className="search" />
                        </th>
                    </tr>

                </thead>

                {countries.map((dataObj) => (



                    <tbody key={dataObj.name.common} >

                        <tr >

                            <td><img className="image" src={dataObj.coatOfArms.png}

                                alt=" coat" /></td>
                            <td className=""><img src={dataObj.flags.png} alt="flag" className="image" /></td>
                        </tr>
                        <tr>
                            <td >Name</td>
                            <td className="nameComm">{dataObj.name.common}</td>

                        </tr>
                        <tr>
                            <td >Official name</td>
                            <td className="nameOff">{dataObj.name.official}</td>
                        </tr>
                        <tr>
                            <td >Serbian</td>
                            <td className="nameOff"> {dataObj.translations.srp.official}</td>
                        </tr>
                        <tr>
                            <td >Capital</td>
                            <td className="capital">{dataObj.capital}</td>
                        </tr>
                        <tr>
                            <td >Region</td>
                            <td>{dataObj.region}</td>
                        </tr>
                        <tr>
                            <td >Subregion</td>
                            <td>{dataObj.subregion}</td>
                        </tr>
                     {/* <tr>
                        <td>Demonyms</td>
                        <td>{dataObj.demonyms.eng.m}</td>
                     </tr> */}
                        <tr>
                            <td >Population</td>
                            <td className="population">{dataObj.population}</td>
                        </tr>
                           <tr>
                            <td>Lon Lat</td>
                            <td className="long">{dataObj.latlng[0] + " " + dataObj.latlng[1]}</td>
                        </tr>
                        <tr className="region">
                            <td className="maps">Googlemaps</td>
                            <td className="maps">
                                <a href={dataObj.maps.googleMaps} target='_blank' >
                                    maps
                                </a>
                            </td>
                        </tr>
                    </tbody>

                ))}
            </table>
       
    );
};
export default SearchResutsGeog;