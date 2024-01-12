import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import SearchPlace from "./SearchPlace";
import SunriseSunset from "./SunriseSunset";
// import TimeZone from "./TimeZone";

import Loader from "./Loader";



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







    const params = useParams();

    const cityId = params.cityId;



    useEffect(() => {
        getCities();
        getCityTime();

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


    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <table className="tabelaZemlje">
                <thead >

                    <tr>
                        <th colSpan={2}>
                            <SearchPlace />
                        </th>
                    </tr>

                </thead>





                <tbody  >

                <tr>
                        <td >
                            Time zone
                        </td>
                        <td className="population">
                            {vreme.timezone} 
                        </td>
                    </tr>
                    <tr>
                        <td>
                           Time
                        </td>
                        <td className="population">
                            {vreme.hour + ":" + vreme.minute} 
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}
                            className="name">
                            Weather {cityId}
                        </td>
                    </tr>


                    <tr>
                        <td>Wind speed</td>
                        <td className="population">{weather.wind_speed} m/s {(weather.wind_speed * 3.6).toFixed(1)} km/h</td>
                    </tr>

                    <tr>
                        <td>Wind degrees</td>
                        <td className="population">{weather.wind_degrees}&#176; </td>
                    </tr>
                    <tr>
                        <td>Temparature</td>
                        <td className="population">{weather.temp}&#176;C</td>
                    </tr>
                    <tr>
                        <td>Min Temparature</td>
                        <td className="population">{weather.min_temp}&#176;C</td>
                    </tr>
                    <tr>
                        <td>Max Temparature</td>
                        <td className="population">{weather.max_temp}&#176;C</td>
                    </tr>
                    <tr>
                        <td>Feels Like</td>
                        <td className="population">{weather.feels_like}&#176;C</td>
                    </tr>
                    <tr>
                        <td>Humidity</td>
                        <td className="population">{weather.humidity} %</td>
                    </tr>
                    <SunriseSunset dates={weather} />


                    <tr>
                        <td colSpan={2}
                            className="name" >
                            Air Quality
                        </td>
                    </tr>
                    <tr>


                        <td >Carbon monoxide</td>
                        <td className="population">{cityCo.concentration}</td>
                    </tr>
                    <tr>
                        <td >Sulphur dioxide</td>
                        <td className="population">{citySo.concentration}</td>
                    </tr>
                    <tr>
                        <td >Ozone</td>
                        <td className="population">{cityO3.concentration}</td>
                    </tr>
                    <tr>
                        <td >Nitrogen dioxide</td>
                        <td className="population">{cityNo.concentration}</td>
                    </tr>
                    <tr>
                        <td >PM10 particulates</td>
                        <td className="population">{cityPm.concentration}</td>

                    </tr>
                    <tr>

                        <td>Overall Aqi</td>

                        <td
                            className="population">
                            {city.overall_aqi}</td>


                    </tr>

                   



                </tbody>


            </table >


        </>

    );
};
export default SearchResutsGeog;