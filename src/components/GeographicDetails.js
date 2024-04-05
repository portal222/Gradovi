import React, { useState, useEffect } from "react";

import axios from 'axios';
import SearchPlace from "./SearchPlace";
import MapTwoToneIcon from '@mui/icons-material/MapTwoTone';
import { useNavigate, useParams } from "react-router-dom";
import SearchBox from "./SearchBox";
// import Loader from "./Loader";


const SearchResutsGeog = (props) => {
    const [error, setError] = useState(null);
    const [countries, setCountries] = useState([]);
    const [zemlje, setZemlje] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);


    const navigate = useNavigate();




    const params = useParams();

    const drId = params.drId;



    useEffect(() => {
        getCountries();
        getZemlje();

    }, []);

    const getCountries = async () => {

        const url = `https://restcountries.com/v3.1/name/${drId}`;

        try {
            const response = await axios.get(url);
            const data = response.data;

            console.log("Detalji", data);

            setCountries(data);
        } catch (err) {
            setError(err);
            // setIsLoading(false);
        }

    };

    const getZemlje = async () => {
        const url = `https://api.api-ninjas.com/v1/country?name=${drId}`;

        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const data = response.data;

            console.log("detalji druge zemlje", data);


            setZemlje(data);

        } catch (err) {
            setError(err);
            // setIsLoading(false);


        }

    };

    const handleClick = (cityId) => {
        console.log("iz drzava grad", cityId);
        const LinkTo = `capital/${cityId}`;
        navigate(LinkTo);
    }




    return (
        <>
            {countries.map((dataObj) => (
                <table className="tabelaZemlje">






                    <tbody key={dataObj.population} >

                        <tr className="name">

                            <td ><img className="coat" src={dataObj.coatOfArms.png}
                                alt=" coat" />
                            </td>
                        </tr>
                        <tr className="name">
                            <td
                            ><img className="coat" src={dataObj.flags.png}
                                alt="flag" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="countryMain">
                                    <table>
                                        <tbody>
                                            <tr>

                                                <td colSpan={2}
                                                    className="nameComm">{dataObj.name.common}</td>
                                                <td className="title">Capital</td>
                                                <td
                                                    className="nameOffCity"
                                                    onClick={() => handleClick(dataObj.capital)}>
                                                    {dataObj.capital}</td>
                                            </tr>
                                            <tr>
                                                <td className="title">Official </td>
                                                <td className="lang2">{dataObj.name.official}</td>
                                                <td className="title">Serbian</td>
                                                <td className="lang2"> {dataObj.translations.srp.official}</td>

                                            </tr>
                                            <tr>
                                                <td className="title">Region</td>
                                                <td className="lang">{dataObj.region}</td>

                                                <td className="title">Subregion</td>
                                                <td className="lang">{dataObj.subregion}</td>
                                            </tr>
                                            <tr>
                                                <td className="title">Demonyms</td>
                                                <td className="lang">{dataObj.demonyms.eng.m}</td>

                                                <td className="title">Languages</td>
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
                                        </tbody>
                                    </table>
                                </div>
                            </td>

                        </tr>















                    </tbody>


                </table>
            ))}
            {zemlje.map((dataZem) => (
                <table className="mainDiv">


                    <tbody key={dataZem.name}>
                        <tr>
                            <td >
                                <div className="windMain">
                                    <table className="windHold">
                                        <tbody><tr>
                                            <td
                                                className="title">
                                                Currency
                                            </td>
                                            <td colSpan={2}
                                                className="wind">
                                                {dataZem.currency.name + " - " + dataZem.currency.code}
                                            </td>
                                        </tr>

                                            <tr>
                                                <td className="title">GDP</td>
                                                <td className="wind">{dataZem.gdp} M$</td>
                                            </tr>
                                            <tr>
                                                <td className="title"> GDP growth</td>
                                                <td className="wind">{dataZem.gdp_growth} %</td>
                                            </tr>

                                            <tr>
                                                <td className="title"> GDP per capita</td>
                                                <td className="wind">{dataZem.gdp_per_capita} $</td>
                                            </tr>
                                            <tr>
                                                <td className="title">Exports</td>
                                                <td className="wind">{dataZem.exports} M$</td>
                                            </tr>
                                            <tr>
                                                <td className="title">Imports</td>
                                                <td className="wind">{dataZem.imports} M$</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table className="tempHold">
                                        <tbody>
                                            <tr>
                                                <td className="title2">
                                                    Population
                                                </td>


                                                <td className="popNumb">{dataZem.population * 1000} </td>

                                            </tr>
                                            <tr>
                                                <td className="title2">Urban Population</td>
                                                <td className="temp">{dataZem.urban_population} %</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">Population Density</td>
                                                <td className="temp">{dataZem.pop_density} %</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">Population Growth</td>
                                                <td className="temp">{dataZem.pop_growth} </td>
                                            </tr>
                                            <tr>
                                                <td className="title2">Urban Population Growth</td>
                                                <td className="temp">{dataZem.urban_population_growth} </td>
                                            </tr>

                                            <tr>
                                                <td className="title2">Fertility</td>
                                                <td className="temp">{dataZem.fertility}</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">Homicide Rate</td>
                                                <td className="temp">{dataZem.homicide_rate}</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">Life Expectancy Male - Female</td>
                                                <td className="temp">{dataZem.life_expectancy_male + " - " + dataZem.life_expectancy_female} year</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div></td>


                        </tr>
                        <tr>
                            <td >
                                <div className="windMain">
                                    <table className="windHold">
                                        <tbody>

                                            {countries.map((dataArea) => (
                                                <tr>
                                                    <td className="title">Area</td>
                                                    <td className="wind">{dataArea.area} km2</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td className="title">Forested Area</td>
                                                <td className="wind">{dataZem.forested_area} %</td>
                                            </tr>
                                            <tr>
                                                <td className="title">CO2 Emissions</td>
                                                <td className="wind">{dataZem.co2_emissions} </td>
                                            </tr>
                                            <tr>
                                                <td className="title">Threatened species</td>
                                                <td className="wind">{dataZem.threatened_species} </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                    <table className="tempHold">
                                        <tbody>
                                            <tr>
                                                <td className="title2">Employment Services</td>
                                                <td className="temp">{dataZem.employment_services} %</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">Employment Industry</td>
                                                <td className="temp">{dataZem.employment_industry} %</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">Employment Agriculture</td>
                                                <td className="temp">{dataZem.employment_agriculture} %</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">Unemployment</td>
                                                <td className="temp">{dataZem.unemployment} %</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="windMain">
                                    <table className="windHold">
                                        {countries.map((dataArea) => (
                                            <tbody>
                                                <tr>
                                                    <td className="title">Timezones</td>
                                                    <td className="wind">


                                                        {dataArea.timezones[0]}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="title">Car signs</td>
                                                    <td className="wind">{dataArea.car.signs}</td>
                                                </tr>
                                                <tr>
                                                    <td className="title">Car side</td>
                                                    <td className="wind">{dataArea.car.side}</td>
                                                </tr>
                                                <tr >
                                                    <td className="title">Googlemaps</td>
                                                    <td >
                                                        <a href={dataArea.maps.googleMaps} target='_blank' >
                                                            <MapTwoToneIcon className="googleMap" />

                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                    <table className="tempHold">
                                        <tbody>
                                            <tr>
                                                <td className="title2">Internet Users</td>
                                                <td className="temp">{dataZem.internet_users} %</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">primary school male</td>
                                                <td className="temp">{dataZem.primary_school_enrollment_male
                                                } %</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">primary school female</td>
                                                <td className="temp">{dataZem.primary_school_enrollment_female
                                                } %</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">secondary school male</td>
                                                <td className="temp">{dataZem.secondary_school_enrollment_male
                                                } %</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">secondary school female</td>
                                                <td className="temp">{dataZem.secondary_school_enrollment_female
                                                } %</td>
                                            </tr>

                                            <tr>
                                                <td className="title2">post secondary male</td>
                                                <td className="temp">{dataZem.post_secondary_enrollment_male
                                                } %</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">post secondary female</td>
                                                <td className="temp">{dataZem.post_secondary_enrollment_female
                                                } %</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">Tourists</td>
                                                <td className="temp">{dataZem.tourists * 1000}</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">Refugees</td>
                                                <td className="temp">{dataZem.refugees * 1000}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </td>
                        </tr>



















                    </tbody>
                </table>
            ))}

        </>
    );
};
export default SearchResutsGeog;