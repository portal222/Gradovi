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


            setCity(dataAir);
            setCityCo(dataAir.CO);
            setCitySo(dataAir.SO2);
            setCityO3(dataAir.O3);
            setCityNo(dataAir.NO2);
            setCityPm(dataAir.PM10);

            setWeather(dataWeat);
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
            <table className="tabelaZemlje">
                <thead >

                    <tr>
                        <th colSpan={3}>
                            <SearchPlace />
                        </th>

                    </tr>


                </thead>





                <tbody  >
                    <tr>
                        <td colSpan={3}
                            className="name">
                            {cityId}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Population
                        </td>
                        <td colSpan={2}
                            className="population">
                            {cityPopul[0]?.population}
                        </td>
                    </tr>
                    <tr>
                        <td>Position

                        </td>
                        <td className="dropdown">
                            <span>
                                <CityPosition lonti={cityLong} />
                            </span>

                            <span className="dropdown-content">
                                <p>copy </p></span>
                        </td>

                        <td className="mapIcon">
                            <a href="https://www.google.com/maps/" target="_blank">
                                <MapTwoToneIcon className="mapIcon" />

                                Map </a>

                        </td>
                    </tr>




                    <tr>
                        <td >
                            Time zone
                        </td>
                        <td colSpan={2}
                            className="population">
                            {vreme.timezone}
                        </td>
                    </tr>
                    <tr>
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
                        <td>Wind speed</td>
                        <td className="population">
                            {weather.wind_speed} m/s</td>
                        <td className="aqiNum">
                            {(weather.wind_speed * 3.6).toFixed(1)} km/h</td>
                    </tr>

                    <tr>
                        <td>Wind degrees</td>
                        <td colSpan={2}
                            className="population">{weather.wind_degrees}&#176; </td>
                    </tr>
                    <tr>
                        <td>Temparature</td>
                        <td colSpan={2}
                            className="population">{weather.temp}&#176;C</td>
                    </tr>
                    <tr>
                        <td>Min Temparature</td>
                        <td colSpan={2}
                            className="population">{weather.min_temp}&#176;C</td>
                    </tr>
                    <tr>
                        <td>Max Temparature</td>
                        <td colSpan={2}
                            className="population">{weather.max_temp}&#176;C</td>
                    </tr>
                    <tr>
                        <td>Feels Like</td>
                        <td colSpan={2}
                            className="population">{weather.feels_like}&#176;C</td>
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


                    </tr>





                </tbody>


            </table >


        </>

    );
};
export default SearchResutsGeog;