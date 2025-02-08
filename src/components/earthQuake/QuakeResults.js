import React, { useState, useEffect, useRef, useContext } from "react";
import GlobalContext from "../GlobalContext";
import axios from 'axios';
import Today from "./Today";
import GoogleMap from "./GoogleMap";
import PaginationQuake from "./PaginationQuake";
import { Box, Pagination } from "@mui/material";



const QuakeResults = () => {

    const { startDate, setStartDate, endDate, setEndDate } = useContext(GlobalContext);

    const [error, setError] = useState(null);
    const [equake, setEquake] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);




    useEffect(() => {
        if (startDate && endDate) {
            getQuake(startDate, endDate);
        }
    }, [startDate, endDate]);


    const getQuake = async (startDate, endDate) => {
        const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}&minmagnitude=4`;

        try {
            const response = await axios.get(url);
            const data = response.data;
            setEquake(data.features);

            console.log("rezultati biranja datuma", data)
        } catch (err) {
            setError(err);
        }
    }

    const handleStartDateChange = (e) => {
        const date = new Date(e.target.value);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        setStartDate(formattedDate);
        console.log("start date:", formattedDate);

        if (formattedDate && endDate) {
            getQuake(formattedDate, endDate);
        }
    };

    const handleEndDateChange = (e) => {
        const date = new Date(e.target.value);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        setEndDate(formattedDate);
        console.log("end date:", formattedDate);

        if (startDate && formattedDate) {
            getQuake(startDate, formattedDate);
        }
    };

    const pageSize = 10;
    const paginatedPosts = PaginationQuake(equake, pageSize);
    const currentPosts = paginatedPosts[currentPage - 1];

         window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <>
            <div className="tabelaZemlje">
                <div className="choose">
                Select a start and end date for earthquakes that are above magnitude 4
                </div>
                <div className="fieldset">
                    <fieldset>
                        <legend>Start Date:</legend>
                        <input type="date" title="choose a start date" onChange={handleStartDateChange} />
                    </fieldset>
                    <fieldset>
                        <legend>End Date:</legend>
                        <input type="date" title="choose an end date" onChange={handleEndDateChange} />
                    </fieldset>
                </div>

            </div>

            <div className="tabelaZemlje">
                {startDate && endDate && (
                    <div className="choose">
                        Between {startDate} and {endDate}, {equake.length} earthquakes occurred.
                    </div>
                )}


                {currentPosts &&
                    currentPosts.map((q, id) => (
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
                <Box>
                    {paginatedPosts.length > 1 && (
                        <Box mt={4} display="flex" justifyContent="center" >
                            <Pagination
                                shape="rounded"
                                color="primary"
                                count={paginatedPosts.length}
                                page={currentPage}
                                siblingCount={0}
                                onChange={(_, newPage) => {
                                    setCurrentPage(newPage);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            />

                        </Box>
                    )}
                </Box>
            </div>
        </>
    );

}

export default QuakeResults;


