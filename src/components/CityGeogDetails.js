import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import SearchPlace from "./SearchPlace";
import MapTwoToneIcon from '@mui/icons-material/MapTwoTone';
import Loader from "./Loader";



const SearchResutsGeog = (props) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [countries, setCountries] = useState([]);


    const params = useParams();

    const drId = params.drId;



    useEffect(() => {
        getCountries();
    }, []);

    const getCountries = async () => {

        const url = `https://restcountries.com/v3.1/name/${drId}`;

        try {
            const response = await axios.get(url);
            const data = response.data;

            console.log("zemlja iz gradova", data);

            setCountries(data);
            setIsLoading(false);

        } catch (err) {
            setError(err);
            setIsLoading(false);

        }

    };

    if (isLoading) {
        return <Loader />
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
                            alt=" coat" />
                        </td>
                        <td className="flag"><img src={dataObj.flags.png}
                            alt="flag" className="imageFl" />
                        </td>
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
                        <td className="lang">{dataObj.region}</td>
                    </tr>
                    <tr>
                        <td >Subregion</td>
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
                            || dataObj.languages.ara || dataObj.languages.pus || dataObj.languages.tuk || dataObj.languages.est || dataObj.languages.dan
                            || dataObj.languages.vie || dataObj.languages.de || dataObj.languages.kaz || dataObj.languages.lav || dataObj.languages.swa
                            || dataObj.languages.rus || dataObj.languages.ita || dataObj.languages.sqi || dataObj.languages.srp || dataObj.languages.zho
                            || dataObj.languages.nld || dataObj.languages.hrv || dataObj.languages.mkd || dataObj.languages.bos || dataObj.languages.pol
                            || dataObj.languages.por || dataObj.languages.slv || dataObj.languages.ron || dataObj.languages.lit || dataObj.languages.cat
                            || dataObj.languages.bul || dataObj.languages.ell || dataObj.languages.kal || dataObj.languages.ces || dataObj.languages.slk
                            || dataObj.languages.mon || dataObj.languages.cnr || dataObj.languages.hun || dataObj.languages.kor || dataObj.languages.mya
                            || dataObj.languages.nor || dataObj.languages.fin || dataObj.languages.swe || dataObj.languages.ind
                            || dataObj.languages.spa || dataObj.languages.deu || dataObj.languages.fra
                            || dataObj.languages.eng}</td>
                    </tr>
                    <tr>
                        <td>Timezones:</td>
                        <td className="lang">


                            {dataObj.timezones[0]}
                        </td>
                    </tr>


                    <tr>
                        <td >Population</td>
                        <td className="population">{dataObj.population}</td>
                    </tr>
                    <tr>
                        <td>Area sqkm:</td>
                        <td className="population">{dataObj.area}</td>
                    </tr>
                    <tr>
                        <td>Car side:</td>
                        <td className="lang">{dataObj.car.side}</td>
                    </tr>
                    <tr>
                        <td>Car signs:</td>
                        <td className="population">{dataObj.car.signs}</td>
                    </tr>

                    <tr>
                        <td>Lon Lat</td>
                        <td className="long">{dataObj.latlng[0] + " " + dataObj.latlng[1]}</td>
                    </tr>
                    <tr className="region">
                        <td className="maps">Googlemaps</td>
                        <td className="maps">
                            <a href={dataObj.maps.googleMaps} target='_blank' >
                                <MapTwoToneIcon className="mapIcon" />

                            </a>
                        </td>
                    </tr>
                </tbody>

            ))}
        </table>

    );
};
export default SearchResutsGeog;