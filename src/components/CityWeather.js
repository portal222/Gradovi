import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useParams } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";



const CityWeather = (props) => {

    const [error, setError] = useState(null);
    const [wind, setWind] = useState([]);
    const navigate = useNavigate();


    console.log("pre nego ga trazimo lon", props.lon)

    // const params = useParams();

    const lati = props.lat;
    const loni = props.lon;

    const handleClick = (latId, lonId) => {
        console.log("klik na ovde vreme", latId, lonId);
        const LinkTo = `cityWeather/${latId, lonId}`;
        navigate(LinkTo);
    }


    useEffect(() => {
        getWeather(lati, loni);
    }, [lati, loni])

    const getWeather = async (lati, loni) => {
        console.log("ima li longtitude", loni)
        const urlWeat = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lati + '&lon=' + loni + '&appid=68ba2a247cda7d9e6110196a5ba81f27';
        const response = await fetch(urlWeat);
        const data = await response.json();
        console.log(" podaci weather sa fetchom ", data);
        setWind(data);
    }

    // useEffect(() => {
    //     axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&appid=68ba2a247cda7d9e6110196a5ba81f27`).then(res => {
    //         const data = res.data;
        
    //         console.log("iz city weather podaci", data)


    //     });

    // }, [])


    // useEffect(() => {
    //     getWeather();
    //    }, [])
    
    //    const getWeather = async () => {
    //     const urlWeat = `https://api.openweathermap.org/data/2.5/weather?lat={lati}&lon={loni}&appid=68ba2a247cda7d9e6110196a5ba81f27`;
    
    //     try {
    //         const responseWeat = await axios.get(urlWeat);
    //         const weather = responseWeat.data;
            
            
            
    //         console.log("sa sajta za vreme", weather);

    //         return tru
            
    //     } catch (err) {
         
    //         setError(err);
    
            
    //     }
    // };
    
    return (
        <>
        <button
          onClick={() => handleClick(lati, loni)}>
            ovde vreme</button>
        <div>
            {lati}
            {loni}
        </div>
        <div>
            {wind.name}
        </div>
        </>
    )


}
export default CityWeather;