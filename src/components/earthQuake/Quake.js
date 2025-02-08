import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Today from "./Today";
import GoogleMap from "./GoogleMap";
import QuakeResults from "./QuakeResults";
import Loader from "../Loader";
import BackToTop from "../BackToTop";



const Quake = () => {

    const [error, setError] = useState(null);
    const [equake, setEquake] = useState([]);
    const [filteredEquake, setFilteredEquake] = useState([]);
    const [timeEnd, setTimeEnd] = useState([]);
    const [timeStart, setTimeStart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const hasFetcheData = useRef(false);  //useRef sluzi za pracenje zahteva




    useEffect(() => {
        getTime();
    }, []);

    const getTime = () => {

        const tоday = new Date;
        let dayInMonth = tоday.getDate();
        // var yestrday = tоday.getDate() - 1;
        let month = tоday.getMonth() + 1;
        const year = tоday.getFullYear();

        let yesterday = new Date();
        yesterday.setDate(dayInMonth - 1);

        if (dayInMonth < 10) {
            dayInMonth = "0" + dayInMonth
        }

        if (yesterday.getMonth() < 10) {
            month = "0" + (yesterday.getMonth() + 1);
        } else {
            month = yesterday.getMonth() + 1;
        }

        let dayYesterday = yesterday.getDate();
        if (dayYesterday < 10) {
            dayYesterday = "0" + dayYesterday;
        }

        setTimeEnd(year + "-" + month + "-" + dayInMonth);
        setTimeStart(year + "-" + month + "-" + dayYesterday);
    }


    const datumKraj = timeEnd
    const datumPocetak = timeStart


    useEffect(() => {
        if (!hasFetcheData.current) {
            getQuake(datumPocetak, datumKraj);
            hasFetcheData.current = true; 
        }

    }, [datumPocetak, datumKraj]);

    useEffect(() => {
        if (equake.length > 0) {
            //konvertuj datume u UNIX vremenske zigove
            const startTime = new Date(datumPocetak).getTime();
            const endTime = new Date(datumKraj).getTime();
            // Филтрирај податке према твом временском оквиру само ако је filteredEquake празан
            if (filteredEquake.length === 0) {
                const filteredData = equake.filter(feature => {
                    const quakeTime = feature.properties.time; // UNIX vreme je u milisekundama
                    return quakeTime >= startTime && quakeTime <= endTime;
                });

                console.log("филтрирани подаци о земљотресима", filteredData);
                setFilteredEquake(filteredData);
            }
        }
    }, [equake, datumPocetak, datumKraj, filteredEquake]);

    const getQuake = async (datumPocetak, datumKraj) => {

        const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${datumPocetak}&endtime=${datumKraj}&minmagnitude=4`;



        try {

            const response = await axios.get(url);
            const data = response.data;
            console.log("zemljotres podaci", data);
            setIsLoading(false);
            setEquake(data.features);
        } catch (err) {
            setError(err);
        }
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (isLoading) {
        return <Loader />
    }


    return (
        <>
                               

            <QuakeResults />
            <div className="tabelaZemlje" >
                <div className="choose">There have been {filteredEquake.length} earthquakes in the last 24 hours.</div>
                {filteredEquake.map((q, id) => (
                    <>
                        <div className="quake" key={id}>
                            <div>
                                <p className="magnitude">{q.properties.mag}</p>
                                <p className="titleQ">{q.properties.place}</p>
                                <p className="time"><Today time={q.properties.time} /></p>
                            </div>
                            <div>
                                <p><GoogleMap lat={q.geometry.coordinates[1]} lon={q.geometry.coordinates[0]} /></p>
                            </div>
                        </div>
                        <hr></hr>
                    </>
                ))}
            </div>
            <div><BackToTop /></div>
        </>
    );

}

export default Quake;