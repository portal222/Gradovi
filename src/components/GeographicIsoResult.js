import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const GeographicIsoResult = (props) => {
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

            const isoId = data.filter(
                (isoalpha => isoalpha.iso3.includes(alpha))
            );
            setCountries(isoId);

        } catch (err) {
            setError(err);
        }
    }

    const handleClick = (drId) => {
        const LinkTo = `/detalji/${drId}/isoresult/${drId}`;
        navigate(LinkTo);
    }

    return (
        <div>
            <p className="coName">
                <img src={countries?.[0]?.flag} alt="" className="coFlag"
                    onClick={() => {
                        handleClick(countries?.[0]?.name);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                />
            </p>
            <p className="coName"
                onClick={() => {
                    handleClick(countries?.[0]?.name);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
            >{countries?.[0]?.name}</p>
        </div>
    );
};
export default GeographicIsoResult
    ;