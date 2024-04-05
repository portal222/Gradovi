import React, { useState } from "react";
import sunny from "../../public/assets/img/Sunny.svg";
import MostlySunny from "../../public/assets/img/Mostly_sunny.svg"
import PartlySunny from "../../public/assets/img/Partly_sunny.svg";
import PartlyCloudy from "../../public/assets/img/Partly_cloudy.svg";
import MostlyCloudy from "../../public/assets/img/Mostly_cloudy.svg";
import Cloudy from "../../public/assets/img/Cloudy.svg";

const CloudPicture = (props) => {



    const picture = props.clouds.cloud_pct

    if (picture < 11) {
        return (
            <>

                <img src={sunny}
                    alt="no picture" className="imgHold"
                /><p>
                    Sunny
                </p>
            </>
        )
    } else if (picture > 10 && picture < 31) {
        return (
            <>
                <img src={MostlySunny}
                    alt="no picture" className="imgHold"
                />
                <p>Mostly sunny</p></>
        )
    } else if (picture > 30 && picture < 51) {
        return (
            <>

                <img src={PartlySunny}
                    alt="no picture" className="imgHold"
                />
                <p>Partly sunny</p>               </>
        )
    } else if (picture > 50 && picture < 71) {
        return (
            <>
                <img src={PartlyCloudy}
                    alt="no picture" className="imgHold"
                /><p>
                    Partly cloudy
                </p>
            </>
        )
    } else if (picture > 70 && picture < 91) {
        return (
            <>
                <img src={MostlyCloudy}
                    alt="no picture" className="imgHold"
                />
                <p>
                    Mostly Cloudy
                </p>
            </>
        )
    } else if (picture > 90 && picture < 101) {
        return (
            <>
                <img src={Cloudy}
                    alt="no picture" className="imgHold"
                />
                <p>
                    Cloudy
                </p>
            </>
        )
    }
    return (
        <>
            <div>
                no data
            </div>
        </>
    )

}
export default CloudPicture;