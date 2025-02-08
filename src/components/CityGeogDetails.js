import React, { useState, useEffect } from "react";
import SunriseSunset from "./SunriseSunset";
import CloudPicture from "./CloudPicture";
import windA from "../../public/assets/img/wind-arrow.svg";
import DateHour from "./DateHour";
import DateDays from "./DateDays";
import NyTimes from "./NyTimes";
import RainPicture from "./RainPicture";


const SearchResutsGeog = (props) => {
    const [error, setError] = useState(null);
    const [wind, setWind] = useState([]);
    const [popul, setPopul] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [nytCity, setNytCity] = useState([]);
    const [cityName, setCityName] = useState([]);


    const lat = props.lat
    const lon = props.lon
    const nameCity = props.city

    console.log("props imena grada", nameCity)


    const googleMap = 'https://maps.google.com/maps?q=' +
        lat +
        ',' +
        lon +
        '&h1=en&z=12&output=embed'

    console.log("koordinate", lat)

    useEffect(() => {
        getWeather(lat, lon);
        getForecast(lat, lon);
    }, [lat, lon])

    const getWeather = async (lat, lon) => {
        const urlWeat = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=68ba2a247cda7d9e6110196a5ba81f27';
        const response = await fetch(urlWeat);
        const data = await response.json();
        console.log(" podaci weather sa fetchom ", data);
        setWind(data);
    }

    const getForecast = async (lat, lon) => {
        const urlWeat = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=68ba2a247cda7d9e6110196a5ba81f27';
        const response = await fetch(urlWeat);
        const data = await response.json();

        setPopul(data);
        setForecast(data.list);
        setCityName(data.city.name)
        console.log("forecast podaci", data.list);
    }

    useEffect(() => {
        getTimes();
    }, [])

    const getTimes = async () => {
        const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${nameCity}&api-key=GmsdDOX2JjxHcopan54o6M2dgET0H2hp`

        const response = await fetch(url);
        const data = await response.json();
        console.log(" podaci NYT grada sa fetchom ", data.response.docs);
        setNytCity(data.response.docs);
    }

    const classFunction = (temp) => {
        if (temp > 303) {
            return 'hotTemp1';
        } else if (temp > 298 && temp < 303) {
            return 'hotTemp2';
        } else if (temp > 293 && temp < 299) {
            return 'hotTemp3';
        } else if (temp > 288 && temp < 294) {
            return 'hotTemp4';
        } else if (temp > 283 && temp < 289) {
            return 'hotTemp5';
        } else if (temp > 278 && temp < 284) {
            return 'hotTemp6';
        } else if (temp > 273 && temp < 279) {
            return 'hotTemp7';
        } else if (temp > 268 && temp < 274) {
            return 'hotTemp8';
        }
    };


    return (
        <>
            <table className="mainDiv">
                <tbody  >
                    <tr>
                        <td className="cityMain">
                            <iframe src={googleMap} className="maps"></iframe>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="windMain">
                                <table className="tempHold">
                                    <tbody>
                                        <tr>
                                            <td rowSpan={2} className={`tempDeg ${classFunction(wind.main?.temp)
                                                }`}
                                            >
                                                {(wind.main?.temp - 273.15).toFixed(1)}&#176;C
                                            </td>

                                            <td className="title">min</td>
                                            <td
                                                className="temp"
                                            > {(wind.main?.temp_min - 273.15).toFixed(1)}&#176;C
                                            </td>
                                            <td rowSpan={3}
                                                className="temp2">
                                                <CloudPicture clouds={wind.clouds?.all} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="title">
                                                max.
                                            </td>
                                            <td
                                                className="temp"
                                            >{(wind.main?.temp_max - 273.15).toFixed(1)}&#176;C
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="temp">
                                                {wind.weather?.[0]?.description}
                                            </td>

                                            <td
                                                className="title">feels like</td>
                                            <td
                                                className="temp">
                                                {(wind.main?.feels_like - 273.15).toFixed(1)}&#176;C
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
                                                            rotate: `${wind.wind?.deg - 180}deg`
                                                        }}
                                                        src={windA} alt="no picture"
                                                    />
                                                </div>
                                            </td>
                                            <td className="wind">
                                                {wind.wind?.speed}
                                            </td>
                                            <td className="title">m/s</td>
                                        </tr>
                                        <tr>

                                            <td className="wind">
                                                {(wind.wind?.speed * 3.6).toFixed(1)} </td>
                                            <td className="title">km/h</td>
                                        </tr>
                                        <tr>
                                            <td className="title">Humidity</td>
                                            <td className="wind">
                                                {wind.main?.humidity}
                                            </td>
                                            <td className="title">%</td>
                                        </tr>
                                        <tr>
                                            <td className="title">Pressure</td>
                                            <td className="wind">
                                                {wind.main?.pressure}
                                            </td>
                                            <td className="title">mb</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div></td>
                    </tr>
                    <tr>
                        <td >
                            <div className="windMain">
                                <SunriseSunset dates={wind.sys} population={popul.city?.population}
                                    cityName={popul.city?.name} />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table >
            <table className="forecast">
                <thead>
                    <tr>
                        <td colSpan={6} className="titleMain">
                            Weather Forecast
                        </td>
                    </tr>
                    <tr >
                        <td className="title">
                            Date and time
                        </td>
                        <td className="title">
                            Temp.
                        </td>
                        <td className="title" colSpan={2}>
                            Description
                        </td>

                        <td className="title">
                            Wind
                        </td>
                        <td className="title">
                            humidity <br></br>
                            pressure
                        </td>
                    </tr>
                </thead>
                {forecast.map((obj, id) => (
                    <tbody className="forecast" key={id}>
                        <tr>
                            <td className="date" rowSpan={2}>
                                {obj.dt_txt?.replace('15:00:00', '').replace('18:00:00', '').replace('21:00:00', '')
                                    .replace('00:00:00', '').replace('03:00:00', '').replace('06:00:00', '').replace('09:00:00', '')
                                    .replace('12:00:00', '').replace('2024-', '')}
                                <br></br>
                                <DateDays time={obj.dt} />
                                <br></br>
                                <DateHour time={obj.dt} />
                            </td>
                            <td rowSpan={2}
                                className={`temp ${classFunction(obj.main?.temp)

                                    }`}>
                                {(obj.main?.temp - 273.15).toFixed(1)}&#176;C
                            </td>
                            <td rowSpan={2} className="description">
                                {obj.weather?.[0]?.description}

                            </td>
                            <td className="cloud" rowSpan={2}>
                                <CloudPicture clouds={obj.clouds?.all} />
                                <RainPicture rain={obj.weather?.[0].description} />
                            </td>
                            <td className="windPlace">
                                <img className="arrow"
                                    style={{
                                        rotate: `${obj.wind?.deg - 180}deg`
                                    }}
                                    src={windA} alt="no picture"
                                />
                            </td>
                            <td rowSpan={2} className="press">
                                {obj.main?.humidity}% <br></br>
                                {obj.main?.pressure}mb
                            </td>
                        </tr>
                        <tr>
                            <td className="desc"> {obj.wind?.speed}m/s</td>
                        </tr>
                    </tbody>
                ))}
            </table>
            <NyTimes news={nytCity} />
        </>
    );
};
export default SearchResutsGeog;