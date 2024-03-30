import React, { useState } from "react";

const CloudPicture = (props) => {

    ;

    const picture = props.clouds.cloud_pct

    if (picture < 20) {
        return (
            <>

                <img src="../img/wi-day-sunny.svg"
                    alt="no picture" className="imgHold"
                /><p>
                 lepo vreme   
                </p>
                </>
        )
    } else if (picture > 19 && picture < 40) {
        return (
            <>
                <img src="../img/wi-day-sunny-overcast.svg"
                    alt="no picture" className="imgHold"
                />
                <p>mala oblacnost</p></>
        )
    } else if (picture > 39 && picture < 60) {
        return (
            <>
                {/* <img src="../img/wi-cloudy.svg" */}
                <img src="../img/ikona-proba.svg"
                    alt="no picture" className="imgHold"
                />
                <p>srednje oblacno</p>               </>
        )
    } else if (picture > 59 && picture < 80) {
        return (
            <>
                <img src="../img/wi-cloudy-gusts.svg"
                    alt="no picture" className="imgHold"
                /><p>
                   skoro potpuno 
                </p>
                </>
        )
    } else if (picture > 79 && picture < 101) {
        return (
            <>
                <img src="../img/wi-day-cloudy-high.svg"
                    alt="no picture" className="imgHold"

                />
<p>
    totalna naoblaka
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