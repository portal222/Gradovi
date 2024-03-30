import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import SearchPlace from "./SearchPlace";
import SunriseSunset from "./SunriseSunset";
// import TimeZone from "./TimeZone";

import Loader from "./Loader";
import CityPosition from "./CityPosition";
import MapTwoToneIcon from '@mui/icons-material/MapTwoTone';
import datas from "../../public/city.listDugacak.json";
// import { UpOutlined  } from "@mui/icons-material";
// import {UpOutlined} from "@ant-design/icons"
// import { ArrowUpOutlined } from "@ant-design/icons"
// import { ArrowUpward } from "@mui/icons-material";
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import NorthIcon from '@mui/icons-material/North';
import CloudPicture from "./CloudPicture";





const SearchResutsGeog = (props) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const [city, setCity] = useState([]);

    const [citySo, setCitySo] = useState([]);
    const [cityCo, setCityCo] = useState([]);
    const [cityO3, setCityO3] = useState([]);
    const [cityNo, setCityNo] = useState([]);
    const [cityPm, setCityPm] = useState([]);
    const [weather, setWeather] = useState([]);

    const [vreme, setVreme] = useState([]);
    const [cityPopul, setCityPopul] = useState([]);
    const [cityLong, setCityLong] = useState([]);
    const [cloud, setCloud] = useState([]);
    const [picture, setPicture] = useState([]);







    const params = useParams();

    const cityId = params.cityId;



    useEffect(() => {
        getCities();
        getCityTime();
        getCityPopul();
    }, []);





    const getCities = async () => {

        const urlAir = `https://api.api-ninjas.com/v1/airquality?city=${cityId}`;
        const url = `https://api.api-ninjas.com/v1/weather?city=${cityId}`;




        try {
            const response = await axios.get(urlAir,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            const responseNs = await axios.get(url,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );



            const dataAir = response.data;
            const dataWeat = responseNs.data;




            console.log("rezultat city air", dataAir);
            console.log("rezultat city vreme", dataWeat);

            console.log("broj oblaka", dataWeat.cloud_pct);

            setCity(dataAir);
            setCityCo(dataAir.CO);
            setCitySo(dataAir.SO2);
            setCityO3(dataAir.O3);
            setCityNo(dataAir.NO2);
            setCityPm(dataAir.PM10);

            setWeather(dataWeat);
            setCloud(dataWeat.cloud_pct);
            setPopulation(dataPop);




        } catch (err) {
            setError(err);
            setIsLoading(false);

        }

    };

    const getCityTime = async () => {

        const urlTime = `https://api.api-ninjas.com/v1/worldtime?city=${cityId}`;
        // const urlPop = `https://api.api-ninjas.com/v1/city?name=${cityId}`

        try {
            const response = await axios.get(urlTime,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
            // const responsePop = await axios.get(urlPop,
            //     {
            //         headers: {
            //             'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
            //         }
            //     }
            //     );

            const dataTime = response.data;
            console.log("koliko je sati", dataTime);
            setVreme(dataTime);

            // const dataPop = responsePop.data
            // console.log("broj stanovnika gradova", dataPop)
            // setCityPopul(dataPop);

        } catch (err) {
            setError(err);
            setIsLoading(false);
        }
    };

    const getCityPopul = async () => {
        // const urlPop = `https://countriesnow.space/api/v0.1/countries/population/cities`
        // const urlPop = `https://data.world/dr5hn/country-state-city/workspace/file?filename=${cityId}.json`
        const urlPop = `https://api.api-ninjas.com/v1/city?name=${cityId}`


        try {
            const responsePop = await axios.get(urlPop,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );

            const dataPop = responsePop.data
            console.log("broj stanovnika gradova", dataPop)
            setCityPopul(dataPop);
        } catch (err) {
            setError(err);
            setIsLoading(false);
        }

    }

    useEffect(() => {
        getCityLong(cityId);
    }, [cityId]);

    const getCityLong = (cityId) => {

        try {
            const filterData = datas.filter((city) => {
                return (
                    city.name.toLowerCase().includes(cityId.toLowerCase())
                )
            });
            console.log("city long", filterData);
            setCityLong(filterData);

        } catch (err) {
            setError(err);

        }
    };










    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <table className="mainDiv">
                <thead >

                    <tr>
                        <th colSpan={5}>
                            <SearchPlace />
                        </th>

                    </tr>


                </thead>





                <tbody  >
                    <tr>
                        <td colSpan={2}
                            className="cityName">
                            {cityId}
                        </td>
                        <td className="title">Timezone</td>

                        <td 
                            className="timeZone">
                            {vreme.timezone}
                        </td>
                        <td className="timeHour">{vreme.hour + ":" + vreme.minute}</td>

                    </tr>

                    <tr>
                        <td className="title">
                            Population
                        </td>
                        <td
                            className="timeZone">
                            {cityPopul[0]?.population}
                        </td>
                        <td className="title">Position</td>
                        <td className="dropdown">
                            <span>
                                <CityPosition lonti={cityLong} />
                            </span>

                            <span className="dropdown-content">
                                <span>copy </span></span>
                        </td>
                        <td className="timeHour">
                            <a href="https://www.google.com/maps/" target="_blank">
                                <MapTwoToneIcon />

                                </a>

                        </td>
                    </tr>
                    <tr>
                        <td colSpan={5}
                        >
                            <div className="windMain">
                                <table className="tempHold">
                                    <tbody>
                                        <tr>
                                            <td rowSpan={2} className="tempDeg">
                                                {weather.temp}&#176;
                                            </td>
                                            <td className="title">min</td>
                                            <td
                                                className="temp"
                                            > {weather.min_temp}&#176;
                                            </td>
                                            <td className="title">max</td>
                                            <td
                                                className="temp"
                                            >{weather.max_temp}&#176;
                                            </td>
                                            <td rowSpan={2}
                                                className="temp2">
                                                <CloudPicture clouds={weather} />

                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={3}
                                            className="title">feels like</td>
                                            <td 
                                                className="temp">
                                                {weather.feels_like}&#176;
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                                <table className="windHold">
                                    <tbody>
                                        <tr>
                                            <td rowSpan={2}>
                                                <p
                                                    className="degrees"
                                                    style={{ rotate: `${weather.wind_degrees}deg` }}>
                                                    < NorthIcon />

                                                </p>
                                            </td>
                                            <td
                                                className="wind"
                                            > {weather.wind_speed}
                                            </td>
                                            <td className="title">m/s</td>
                                        </tr>
                                        <tr>
                                            <td className="wind">
                                                {(weather.wind_speed * 3.6).toFixed(1)} </td>
                                            <td className="title">km/h</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div></td>
                    </tr>
                    {/* <tr >

                        <td className="windMain"
                          colSpan={2}
                        >
                            <table className="tempHold">
                                <tbody>
                                    <tr>
                                        <td rowSpan={2}>
                                            {weather.temp}&#176;C
                                        </td>
                                        <td
                                            className="temp"
                                        >min {weather.min_temp}&#176;C max {weather.max_temp}&#176;C
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="temp">
                                            feels like {weather.feels_like}&#176;C
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="windHold">
                                <tbody>
                                    <tr>
                                        <td rowSpan={2}>
                                            <p
                                                className="degrees"
                                                style={{ rotate: `${weather.wind_degrees}deg` }}>
                                                < NorthIcon />

                                            </p>
                                        </td>
                                        <td
                                            className="wind"
                                        > {weather.wind_speed} m/s
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="wind">
                                            {(weather.wind_speed * 3.6).toFixed(1)} km/h</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr> */}

                    {/* <tr>
                        <td>
                            Time
                        </td>
                        <td colSpan={2}
                            className="population">
                            {vreme.hour + ":" + vreme.minute}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}
                            className="population">
                            Weather
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Cloud Precipitation
                        </td>
                        <td colSpan={2}
                            className="population">{weather.cloud_pct}</td>
                    </tr>






                    <tr>
                        <td>Humidity</td>
                        <td colSpan={2}
                            className="population">{weather.humidity} %</td>
                    </tr>
                    <SunriseSunset dates={weather} />


                    <tr>
                        <td colSpan={3}
                            className="population" >
                            Air Quality
                        </td>
                    </tr>
                    <tr>


                        <td ><b>CO </b> Carbon monoxide</td>
                        <td className="population">{cityCo.concentration} </td>
                        <td className="aqiNum">aqi {cityCo.aqi}</td>
                    </tr>
                    <tr>
                        <td ><b>SO2 </b> Sulphur dioxide</td>
                        <td className="population">{citySo.concentration} </td>
                        <td className="aqiNum">aqi {citySo.aqi}</td>
                    </tr>
                    <tr>
                        <td ><b>O3 </b> Ozone</td>
                        <td className="population">{cityO3.concentration} </td>
                        <td className="aqiNum">aqi {cityO3.aqi}</td>
                    </tr>
                    <tr>
                        <td ><b>NO2 </b> Nitrogen dioxide</td>
                        <td className="population">{cityNo.concentration} </td>
                        <td className="aqiNum">aqi {cityNo.aqi}</td>
                    </tr>
                    <tr>
                        <td ><b>PM10 </b> particulates</td>
                        <td className="population">{cityPm.concentration} </td>
                        <td className="aqiNum">aqi {cityPm.aqi}</td>

                    </tr>
                    <tr>

                        <td>Overall Aqi</td>

                        <td colSpan={2}
                            className="population">
                            {city.overall_aqi}</td>


                    </tr> */}





                </tbody>


            </table >


        </>

    );
};
export default SearchResutsGeog;