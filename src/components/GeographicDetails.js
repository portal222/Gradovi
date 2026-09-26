import React, { useState, useEffect } from "react";
import axios from 'axios';
import MapTwoToneIcon from '@mui/icons-material/MapTwoTone';
import { useNavigate, useParams } from "react-router-dom";
import NyTimes from "./NyTimes";
import BackToTop from "./BackToTop"
import GeographicIsoResult from "./GeographicIsoResult";
import GeographicCityResult from "./GeographicCityResult";

const SearchResutsGeog = () => {
    const [error, setError] = useState(null);
    const [countries, setCountries] = useState([]);
    const [dataZem, setDataZem] = useState([]);
    const [times, setTimes] = useState([]);
    const [colors, setColors] = useState([]);

    const navigate = useNavigate();

    const params = useParams();
    const drId = params.drId;

    useEffect(() => {
        getCountries(drId);
        getZemlje(drId);
        getTimes(drId);
    }, [drId]);

    const getCountries = async (drId) => {

        const url = `https://ridlejoke-proxy.kvaka32.workers.dev/rest?q=${drId}`;
        try {
            const response = await axios.get(url);
            const data = response.data.data.objects[0];

            setCountries(data);
            setColors(data.flag.colors.palette);

        } catch (err) {
            setError(err);
        }
    };

    const getZemlje = async (drId) => {
        const url = `https://ridlejoke-proxy.kvaka32.workers.dev/country?name=${drId}`;
        try {
            const response = await axios.get(url,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            const data = response.data[0];
            setDataZem(data);
        } catch (err) {
            setError(err);
        }
    };

    const getTimes = async (drId) => {

        const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${drId}&api-key=GmsdDOX2JjxHcopan54o6M2dgET0H2hp`
        try {
            const response = await axios.get(url);
            const data = response.data
            const nytimes = data.response.docs
            setTimes(data.response.docs)

        } catch (err) {
            setError(err);
        }
    }

    const handleClick = (cityId) => {

        const LinkTo = `/cities/${cityId}`;
        navigate(LinkTo);
    }

    return (
        <>
            <table className="tabelaZemlje">
                <tbody className="countryMain" >
                    <tr className="name">
                        <td colSpan={2}><img className="coat" src={countries?.flag?.url_png}
                            alt="" />
                        </td>
                    </tr>
                    <tr>
                        <td className="lang4">
                            <p></p>{countries?.flag?.description}<p />
                        </td>
                        <td className="colGrid">
                            {colors.slice(0, 4).map((col) => (
                                <> <div key={col.proportion}>

                                    <p style={{ backgroundColor: `${col.hex}` }}
                                        className="color"

                                        onClick={() => {
                                            navigator.clipboard.writeText(col.hex)
                                        }}>
                                    </p>
                                    <p>
                                        {(col.proportion * 100).toFixed(1)} %
                                    </p>
                                </div>
                                </>
                            ))}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <div className="borGrid">
                                {countries?.borders && (
                                    <>
                                        <p>Borders:</p>
                                        {countries?.borders.map((bor) => (
                                            <div>
                                                <p key={bor} >
                                                    {bor}
                                                </p>
                                                <GeographicIsoResult alpha={bor} stateName={drId} />
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="tabelaZemlje">
                <table className="countryMain">
                    <tbody>
                        <tr>
                            <td colSpan={2}
                                className="nameComm">{countries?.names?.common}</td>
                            <td className="title">Capital</td>
                            {countries?.capitals?.[0]?.name && (
                                <td
                                    className="nameOffCity"
                                    onClick={() => handleClick(countries?.capitals?.[0]?.name)}>
                                    {countries.capitals?.[0]?.name}
                                </td>
                            )}
                        </tr>
                        <tr>
                            <td className="title">common </td>
                            <td className="lang2">{countries?.names?.common}</td>
                            <td className="title">official</td>
                            <td className="lang2"> {countries?.names?.official}</td>

                        </tr>
                        <tr>
                            <td className="title">Region</td>
                            <td className="lang">{countries?.region}</td>

                            <td className="title">Subregion</td>
                            <td className="lang">{countries?.subregion}</td>
                        </tr>
                        <tr>
                            <td className="title">Demonyms</td>
                            <td className="lang">{countries?.demonyms?.eng.m}</td>

                            <td className="title">Languages</td>
                            <td className="lang">{countries?.languages?.[0].name}</td>
                        </tr>
                        <tr>
                            <td className="title" colSpan={2}>Government type</td>
                            <td className="lang" colSpan={2}>{countries?.government_type} </td>


                        </tr>
                        <tr>
                            <td className="title">Area</td>
                            <td className="lang">{countries?.area?.kilometers} km²</td>

                            <td className="title">Population</td>
                            <td className="lang">{countries?.population}</td>
                        </tr>
                        <tr>
                            <td className="title">Cars</td>
                            <td className="lang">{countries?.cars?.signs?.[0] + ' ' + countries?.cars?.driving_side} </td>

                            <td className="title">Time zone</td>
                            <td className="lang">{countries?.timezones?.[0]}</td>
                        </tr>
                        <tr>
                            <td className="title">GoogleMaps</td>
                            <td>
                                <a href={countries?.links?.google_maps} target="_blank">
                                    <MapTwoToneIcon />
                                </a>
                            </td>

                            <td className="title">OpenStreetMap</td>
                            <td >
                                <a href={countries?.links?.open_street_maps} target="_blank">
                                    <MapTwoToneIcon />
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4}>



                                <GeographicCityResult stateName={drId} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="lang3">
                                {countries?.descriptions?.short}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="lang3">
                                {countries?.descriptions?.long}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <table className="mainDiv">
                <tbody>
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
                                            {dataZem?.currency?.name + " - " + dataZem?.currency?.code}
                                        </td>
                                    </tr>
                                        <tr>
                                            <td className="title">GDP</td>
                                            <td className="wind">{dataZem?.gdp} M$</td>
                                        </tr>
                                        <tr>
                                            <td className="title"> GDP growth</td>
                                            <td className="wind">{dataZem?.gdp_growth} %</td>
                                        </tr>
                                        <tr>
                                            <td className="title"> GDP per capita</td>
                                            <td className="wind">{dataZem?.gdp_per_capita} $</td>
                                        </tr>
                                        <tr>
                                            <td className="title">Exports</td>
                                            <td className="wind">{dataZem?.exports} M$</td>
                                        </tr>
                                        <tr>
                                            <td className="title">Imports</td>
                                            <td className="wind">{dataZem?.imports} M$</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="tempHold">
                                    <tbody>
                                        <tr>
                                            <td className="title2">
                                                Population
                                            </td>
                                            <td className="popNumb">{dataZem?.population * 1000} </td>
                                        </tr>
                                        <tr>
                                            <td className="title2">Urban Population</td>
                                            <td className="temp">{dataZem?.urban_population} %</td>
                                        </tr>
                                        <tr>
                                            <td className="title2">Population Density</td>
                                            <td className="temp">{dataZem?.pop_density} %</td>
                                        </tr>
                                        <tr>
                                            <td className="title2">Population Growth</td>
                                            <td className="temp">{dataZem?.pop_growth} </td>
                                        </tr>
                                        <tr>
                                            <td className="title2">Urban Population Growth</td>
                                            <td className="temp">{dataZem?.urban_population_growth} </td>
                                        </tr>
                                        <tr>
                                            <td className="title2">Fertility</td>
                                            <td className="temp">{dataZem?.fertility}</td>
                                        </tr>
                                        <tr>
                                            <td className="title2">Homicide Rate</td>
                                            <td className="temp">{dataZem?.homicide_rate}</td>
                                        </tr>
                                        <tr>
                                            <td className="title2">Life Expectancy Male - Female</td>
                                            <td className="temp">{dataZem?.life_expectancy_male + " - " + dataZem?.life_expectancy_female} year</td>
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

                                        <tr>
                                            <td className="title">Forested Area</td>
                                            <td className="wind">{dataZem?.forested_area} %</td>
                                        </tr>
                                        <tr>
                                            <td className="title">CO2 Emissions</td>
                                            <td className="wind">{dataZem?.co2_emissions} </td>
                                        </tr>
                                        <tr>
                                            <td className="title">Threatened species</td>
                                            <td className="wind">{dataZem?.threatened_species} </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="tempHold">
                                    <tbody>
                                        <tr>
                                            <td className="title2">Employment Services</td>
                                            <td className="temp">{dataZem?.employment_services} %</td>
                                        </tr>
                                        <tr>
                                            <td className="title2">Employment Industry</td>
                                            <td className="temp">{dataZem?.employment_industry} %</td>
                                        </tr>
                                        <tr>
                                            <td className="title2">Employment Agriculture</td>
                                            <td className="temp">{dataZem?.employment_agriculture} %</td>
                                        </tr>
                                        <tr>
                                            <td className="title2">Unemployment</td>
                                            <td className="temp">{dataZem?.unemployment} %</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="windMain">
                                <table className="tempHold">
                                    <tbody>
                                        <tr>
                                            <td className="title2">Internet Users</td>
                                            <td className="temp">{dataZem?.internet_users} %</td>
                                        </tr>
                                        <tr>
                                            <td className="title2">primary school male</td>
                                            <td className="temp">{dataZem?.primary_school_enrollment_male
                                            } %</td>
                                        </tr>
                                        <tr>
                                            <td className="title2">primary school female</td>
                                            <td className="temp">{dataZem?.primary_school_enrollment_female
                                            } %</td>
                                        </tr>
                                        <tr>
                                            <td className="title2">secondary school male</td>
                                            <td className="temp">{dataZem?.secondary_school_enrollment_male
                                            } %</td>
                                        </tr>
                                        <tr>
                                            <td className="title2">secondary school female</td>
                                            <td className="temp">{dataZem?.secondary_school_enrollment_female
                                            } %</td>
                                        </tr>
                                        <tr>
                                            <td className="title2">post secondary male</td>
                                            <td className="temp">{dataZem?.post_secondary_enrollment_male
                                            } %</td>
                                        </tr>
                                        <tr>
                                            <td className="title2">post secondary female</td>
                                            <td className="temp">{dataZem?.post_secondary_enrollment_female
                                            } %</td>
                                        </tr>
                                        <tr>
                                            <td className="title2">Tourists</td>
                                            <td className="temp">{dataZem?.tourists * 1000}</td>
                                        </tr>
                                        <tr>
                                            <td className="title2">Refugees</td>
                                            <td className="temp">{dataZem?.refugees * 1000}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="tabelaZemlje">
                <img src={dataZem?.flag_square_url} alt="" />
            </div>

            <NyTimes news={times} />
            <div>{<BackToTop />}</div>
        </>
    );
};
export default SearchResutsGeog;