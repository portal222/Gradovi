import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import SearchPlace from "./SearchPlace";
import GlobalContext from "./GlobalContext";
import BackToTop from "./BackToTop";

import { useNavigate, useParams } from "react-router-dom";

const GeographicCityResult = (props) => {
    const [error, setError] = useState(null);
    const [countries, setCountries] = useState([]);
    const [style, setStyle] = useState("start");
    const [length, setLength] = useState([]);

    const navigate = useNavigate();

    const changeStyle = () => {

        if (style !== "start") setStyle("start");
        else setStyle("end");
    }

    const cityClick = (cityId) => {
        const LinkTo = `cities/${cityId}`;
        navigate(LinkTo);
    }

    const stateName = props.stateName;

    useEffect(() => {
        getCountries(stateName);
    }, [stateName]);

    const getCountries = async (stateName) => {

        const url = "https://countriesnow.space/api/v0.1/countries/info?returns=flag,iso,cities";

        try {
            const response = await axios.get(url);
            const data = response.data.data
         

            const isoId = data.filter(
                (city => city.name.includes(stateName))
            );
            setCountries(isoId?.[0]?.cities);
            setLength(isoId?.[0]?.cities.length);


        } catch (err) {
            setError(err);
        }
    }

    return (
        <div >

            <div className="buttonC"
                onClick={changeStyle}>
                {length} Cities ▽</div>

            <div className={style}
                onClick={changeStyle}>
                <div className="iks"> ✖</div>
                <div className="cityGrid">
                    {countries?.map((city, id) => (
                        <div key={id}
                            className="title"
                            onClick={() => {
                                cityClick(city);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}>
                            {city}
                        </div>
                    ))}
                </div>
            </div>
        </div>


    );
};
export default GeographicCityResult;
;