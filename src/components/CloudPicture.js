import React, { useState } from "react";

const CloudPicture = (props) => {

    ;

    const picture = props.clouds.cloud_pct

    if (picture < 20) {
        return (
            <>

                <img src="./assets/img/wi-day-sunny.svg"
                    alt="no picture" className="imgHold"
                /><p>
                 vedro vreme   
                </p>
                </>
        )
    } else if (picture > 19 && picture < 40) {
        return (
            <>
                <img src="./assets/img/wi-day-sunny-overcast.svg"
                    alt="no picture" className="imgHold"
                />
                <p>delimično vedro</p></>
        )
    } else if (picture > 39 && picture < 60) {
        return (
            <>
           
                <img src="/assets/img/wi-day-cloudy-high.svg"
                    alt="no picture" className="imgHold"
                />
                <p>srednje oblačno</p>               </>
        )
    } else if (picture > 59 && picture < 80) {
        return (
            <>
                <img src="/assets/img/wi-day-cloudy-gusts.svg"
                    alt="no picture" className="imgHold"
                /><p>
                   delimično oblačno 
                </p>
                </>
        )
    } else if (picture > 79 && picture < 101) {
        return (
            <>
                <img src="/assets/img/wi-cloudy.svg"
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