import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
// import SearchPlace from "./SearchPlace";
import SearchBoxCity from "./SearchBoxCity";

// import TimeZone from "./TimeZone";

import Loader from "./Loader";
import CityPosition from "./CityPosition";
import MapTwoToneIcon from '@mui/icons-material/MapTwoTone';
import datas from "../../public/city.listDugacak.json";

import SunriseSunset from "./SunriseSunset";
import CloudPicture from "./CloudPicture";
import wind from "../../public/assets/img/wind-arrow.svg";
import CityAqi from "./CityAqi";
import Home  from "./Home";





const SearchResutsGeog = (props) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const [city, setCity] = useState([]);

    const [citySo, setCitySo] = useState([]);
    const [cityCo, setCityCo] = useState([]);
    const [cityO3, setCityO3] = useState([]);
    const [cityNo, setCityNo] = useState([]);
    const [cityPm, setCityPm] = useState([]);
    const [cityOverall, setCityOverall] = useState([]);
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


            setCityCo(dataAir.CO);
            setCitySo(dataAir.SO2);
            setCityO3(dataAir.O3);
            setCityNo(dataAir.NO2);
            setCityPm(dataAir.PM10);
            setCityOverall(dataAir);

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


        try {
            const response = await axios.get(urlTime,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );


            const dataTime = response.data;
            console.log("koliko je sati", dataTime);
            setVreme(dataTime);


        } catch (err) {
            setError(err);
            setIsLoading(false);
        }
    };

    const getCityPopul = async () => {

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
                        <th colSpan={3}>
                            {/* <SearchPlace /> */}
           <SearchBoxCity placeholder={'Search Cities'} linkTo={'/searchCity'} className="search" />

                        </th>
                        <th colSpan={2}>
                            <a href="#">home</a>
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
                                <span>copy and paste in  <MapTwoToneIcon /></span></span>
                        </td>
                        <td className="timeHour">
                            <a href="https://www.google.com/maps/" target="_blank">
                                <MapTwoToneIcon />
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={5}>
                            <div className="windMain">
                                <table className="tempHold">
                                    <tbody>
                                        <tr>
                                        <td rowSpan={3} className="tempDeg">
                                                {weather.temp}&#176;
                                            </td>
                                          
                                            <td className="title">min</td>
                                            <td
                                                className="temp"
                                            > {weather.min_temp}&#176;
                                            </td>
                                            <td rowSpan={3}
                                                className="temp2">
                                                <CloudPicture clouds={weather} />
                                            </td>
                                        
                                        </tr>
                                        <tr>
                                            <td className="title">
                                                max.
                                            </td>
                                            <td
                                                className="temp"
                                            >{weather.max_temp}&#176;
                                            </td>
                                          
                                        </tr>
                                        <tr>
                                        
                                            <td
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
                                                <div className="windPlace">
                                                   <img style={{
                                                        rotate: `${weather.wind_degrees}deg`,
                                                        width: '18px'
                                                    }}
                                                        src={wind} alt="no picture"
                                                    />
                                                </div>                                         
                                            </td>
                                            <td className="wind">
                                                 {weather.wind_speed}
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
                    <tr>
                        <td colSpan={5}>
                            <div className="windMain">
                             
                            <SunriseSunset dates={weather} />
<CityAqi dataAirSo={citySo} dataAirCo={cityCo}
                                dataAirO3={cityO3} dataAirNo={cityNo}
                                dataAirPm={cityPm} dataOverall={cityOverall} />
                            </div>
                        </td>
                       
                    </tr>
                





                </tbody>


            </table >


        </>

    );
};
export default SearchResutsGeog;