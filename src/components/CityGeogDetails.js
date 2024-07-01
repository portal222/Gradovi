import React, { useState, useEffect } from "react";
import SunriseSunset from "./SunriseSunset";
import CloudPicture from "./CloudPicture";
import windA from "../../public/assets/img/wind-arrow.svg";

const SearchResutsGeog = (props) => {
    const [error, setError] = useState(null);
    const [wind, setWind] = useState([]);

    const lat = props.lat
    const lon = props.lon




    const googleMap = 'https://maps.google.com/maps?q=' +
        lat +
        ',' +
        lon +
        '&h1=en&z=12&output=embed'

    console.log("koordinate", lat)

    useEffect(() => {
        getWeather(lat, lon);
    }, [lat, lon])

    const getWeather = async (lat, lon) => {
        const urlWeat = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=68ba2a247cda7d9e6110196a5ba81f27';
        const response = await fetch(urlWeat);
        const data = await response.json();
        console.log(" podaci weather sa fetchom ", data);
        setWind(data);
    }

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
                                            <td rowSpan={2} className="tempDeg">
                                                {(wind.main?.temp -273.15).toFixed(1)}&#176;
                                            </td>

                                            <td className="title">min</td>
                                            <td
                                                className="temp"
                                            > {(wind.main?.temp_min -273.15).toFixed(1)}&#176;
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
                                            >{(wind.main?.temp_max -273.15).toFixed(1)}&#176;
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
                                                {(wind.main?.feels_like -273.15).toFixed(1)}&#176;
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
                                            <td className="title">mbar</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div></td>
                    </tr>
                    <tr>
                        <td >
                            <div className="windMain">
                                <SunriseSunset dates={wind.sys} />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table >
        </>
    );
};
export default SearchResutsGeog;