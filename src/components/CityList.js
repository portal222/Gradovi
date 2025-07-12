
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const CityList = (props) => {

    const [style, setStyle] = useState("start")
    const navigate = useNavigate();

    const changeStyle = () => {
     
        if (style !== "start") setStyle("start");
        else setStyle("end");
    }

    const cityClick = (cityId) => {
        const LinkTo = `cities/${cityId}`;
        navigate(LinkTo);
    }


    return (
        <>
            <p>
                <div className="buttonC"
                    onClick={changeStyle}>
                    Cities ▽</div>

                <div className={style}
                    onClick={changeStyle}>
                    <div className="iks">✖</div>

                    {props.cities.slice(0, 33).map((city, id) => (
                        <div className="title"
                            onClick={() => {
                                cityClick(city);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}>
                            {city}
                        </div>
                    ))}
                </div>
            </p>
        </>
    )
}
export default CityList;