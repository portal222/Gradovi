import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import SearchPlace from "./SearchPlace";
import GlobalContext from "./GlobalContext";
import BackToTop from "./BackToTop";

const SearchResutsGeog = () => {
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
                    country.name.official.toLowerCase().includes(searchStringValue.toLowerCase()) ||
                   country.name.common.toLowerCase().includes(searchStringValue.toLowerCase()) ||
                 country.translations.srp.official.toLowerCase().includes(searchStringValue.toLowerCase()) 
                

                );
            });
            console.log("Pretraga", filterData);

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

                        <td><img className="imageTwo" src={dataObj.coatOfArms.png}

                            alt=" coat" /></td>
                        <td className="flag"><img src={dataObj.flags.png} alt="flag"
                            className="imageFl" /></td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <p>{dataObj.flags.alt}</p>
                        </td>
                    </tr>
                    <tr>
                        <td >Name:</td>
                        <td className="nameComm">{dataObj.name.common}</td>

                    </tr>
                    <tr>
                        <td >Official name:</td>
                        <td className="nameOff">{dataObj.name.official}</td>
                    </tr>
                    <tr>
                        <td >Serbian:</td>
                        <td className="nameOff"> {dataObj.translations.srp.official}</td>
                    </tr>
                    <tr>
                        <td >Capital:</td>
                        <td className="capital">{dataObj.capital[0]}</td>
                    </tr>
                    <tr>
                        <td >Region:</td>
                        <td className="lang">{dataObj.region}</td>
                    </tr>
                    <tr>
                        <td >Subregion:</td>
                        <td className="lang">{dataObj.subregion}</td>
                    </tr>
                    <tr>
                        <td>Demonyms:</td>
                        <td className="lang">{dataObj.demonyms.eng.m}</td>
                    </tr>
                    <tr>
                        <td>Languages:</td>
                        <td className="lang">{dataObj.languages.jpn || dataObj.languages.que || dataObj.languages.grn || dataObj.languages.pau
                            || dataObj.languages.nep || dataObj.languages.urd || dataObj.languages.heb || dataObj.languages.ber || dataObj.languages.hin
                            || dataObj.languages.ara || dataObj.languages.pus || dataObj.languages.tuk || dataObj.languages.est
                            || dataObj.languages.vie || dataObj.languages.de || dataObj.languages.kaz || dataObj.languages.lav || dataObj.languages.swa
                            || dataObj.languages.rus || dataObj.languages.ita || dataObj.languages.sqi || dataObj.languages.srp || dataObj.languages.zho
                            || dataObj.languages.nld || dataObj.languages.hrv || dataObj.languages.mkd || dataObj.languages.bos || dataObj.languages.pol
                            || dataObj.languages.por || dataObj.languages.slv || dataObj.languages.ron || dataObj.languages.lit || dataObj.languages.cat
                            || dataObj.languages.bul || dataObj.languages.ell || dataObj.languages.kal || dataObj.languages.ces || dataObj.languages.slk
                            || dataObj.languages.mon || dataObj.languages.cnr || dataObj.languages.hun || dataObj.languages.kor
                            || dataObj.languages.nor || dataObj.languages.fin || dataObj.languages.swe || dataObj.languages.ind
                            || dataObj.languages.spa || dataObj.languages.deu || dataObj.languages.fra
                            || dataObj.languages.eng}</td>
                    </tr>
                    <tr>
                        <td >Population:</td>
                        <td className="population">{dataObj.population}</td>
                    </tr>
                    <tr>
                        <td>Area sqkm:</td>
                        <td className="population">{dataObj.area}</td>
                    </tr>
                    <tr>
                        <td>Lon Lat:</td>
                        <td className="long">{dataObj.latlng[0] + " " + dataObj.latlng[1]}</td>
                    </tr>
                    <tr className="region">
                        <td className="maps">Googlemaps:</td>
                        <td className="maps">
                            <a href={dataObj.maps.googleMaps} target='_blank' >
                                maps
                            </a>
                        </td>
                    </tr>
                </tbody>

            ))}
            <p>{<BackToTop />}</p>
        </table>

    );
};
export default SearchResutsGeog;