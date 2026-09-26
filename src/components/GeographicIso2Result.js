import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';

import { useNavigate, useParams } from "react-router-dom";

const GeographicIso2Result = (props) => {
    const [error, setError] = useState(null);
    const [countries, setCountries] = useState([]);

    const navigate = useNavigate();

    const alpha = props.alpha;
    const drId = props.stateName;

    useEffect(() => {
        getCountries(alpha, drId);
    }, [alpha, drId]);

    const getCountries = async (alpha) => {
        const url = `https://countriesnow.space/api/v0.1/countries/flag/images`;

        try {
            const response = await axios.get(url);
            const data = response.data.data

            const iso2Id = data.filter(
                (isoalpha => isoalpha.iso2.includes(alpha))
            );
            setCountries(iso2Id);

        } catch (err) {
            setError(err);
        }
    }

    const handleClick = (drId) => {
        const LinkTo = `/detalji/${drId}/isoresult/${drId}`;
        navigate(LinkTo);
    }

    return (
        <>
            <p>
                <img src={countries?.[0]?.flag} alt="" style={{ width: "40px" }}
                    onClick={() => {
                        handleClick(countries?.[0]?.name);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                />
            </p>
            <p 
                onClick={() => {
                    handleClick(countries?.[0]?.name);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
            >{" " + countries?.[0]?.name}</p>
        </>
    );
};
export default GeographicIso2Result
    ;