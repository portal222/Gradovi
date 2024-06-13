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
import Home from "./Home";
// import TimeZone from "./TimeZone";





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
    const [cityPopul, setCityPopul] = useState([]);
    const [cityLong, setCityLong] = useState([]);
    const [cloud, setCloud] = useState([]);
    const [picture, setPicture] = useState([]);







    const params = useParams();

    const cityId = params.cityId;

 


    useEffect(() => {
        getCities();
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

   


     const lat = cityLong[0]?.coord.lat
    const long = cityLong[0]?.coord.lon
    const googleMap = 'https://maps.google.com/maps?q=' +
        lat +
        ',' +
        long +
        '&h1=en&z=10&output=embed'








    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <table className="mainDiv">

                <tbody  >
                    <tr>
                        <td>
                            <div>
                                <table className="cityMain">
                                    <tbody>
                      
                                        <tr>
                                            <td colSpan={2}
                                                className="cityName">
                                                {cityId}
                                            </td>
                                 
                                            <td rowSpan={2} >
                                            <iframe src={googleMap} className="maps"></iframe>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="title">
                                                Population
                                            </td>
                                            <td
                                                className="timeZone">
                                                {cityPopul[0]?.population}
                                            </td>
                                           
                               
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
                                                    <img className="arrow"
                                                        style={{
                                                            rotate: `${weather.wind_degrees}deg`
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
                        <td >
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