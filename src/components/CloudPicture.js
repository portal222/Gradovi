import React, { useState } from "react";
import sunny from "../../public/assets/img/wi-day-sunny.svg";
import overcast from "../../public/assets/img/Delimicno_vedro.svg";
import high from "../../public/assets/img/wi-day-cloudy-high.svg";
import gusts from "../../public/assets/img/Oblacno.svg";
import cloudy from "../../public/assets/img/wi-cloudy.svg";

const CloudPicture = (props) => {

    

    const picture = props.clouds.cloud_pct

    if (picture < 20) {
        return (
            <>

                <img src={sunny}
                    alt="no picture" className="imgHold"
                /><p>
                 vedro vreme   
                </p>
                </>
        )
    } else if (picture > 19 && picture < 40) {
        return (
            <>
                <img src={overcast}
                    alt="no picture" className="imgHold"
                />
                <p>delimično vedro</p></>
        )
    } else if (picture > 39 && picture < 60) {
        return (
            <>
           
                <img src={high}
                    alt="no picture" className="imgHold"
                />
                <p>srednje oblačno</p>               </>
        )
    } else if (picture > 59 && picture < 80) {
        return (
            <>
                <img src={gusts}
                    alt="no picture" className="imgHold"
                /><p>
                   delimično oblačno 
                </p>
                </>
        )
    } else if (picture > 79 && picture < 101) {
        return (
            <>
                <img src={cloudy}
                    alt="no picture" className="imgHold"
                />
<p>
    oblačno 
</p>
                </>
        )
    }
    return (
        <>
            <div>
                nema podataka
            </div>
        </>
    )

}
export default CloudPicture;