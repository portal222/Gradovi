import React, { useState } from "react";
import sunny from "../../public/assets/img/Sun.svg";
import MostlySunny from "../../public/assets/img/Clouds_1.svg"
import PartlySunny from "../../public/assets/img/Clouds_2.svg";
import PartlySunny2 from "../../public/assets/img/Clouds_3.svg";
import PartlyCloudy from "../../public/assets/img/Clouds_4.svg";
import PartlyCloudy2 from "../../public/assets/img/Clouds_5.svg";
import MostlyCloudy from "../../public/assets/img/Clouds_6.svg";
import MostlyCloudy2 from "../../public/assets/img/Clouds_7.svg";
import Cloudy from "../../public/assets/img/Clouds_8.svg";

const CloudPicture = (props) => {

    const picture = props.clouds

    if (picture < 11) {
        return (
            <>
                <img src={sunny}
                    alt="no picture" className="imgHold"
                />
            </>
        )
    } else if (picture > 10 && picture < 21) {
        return (
            <>
                <img src={MostlySunny}
                    alt="no picture" className="imgHold"
                />
            </>
        )
    } else if (picture > 20 && picture < 31) {
        return (
            <>
                <img src={PartlySunny}
                    alt="no picture" className="imgHold"
                />
            </>
        )
    } else if (picture > 30 && picture < 41) {
        return (
            <>
                <img src={PartlySunny2}
                    alt="no picture" className="imgHold"
                />
            </>
        )
    } else if (picture > 40 && picture < 51) {
        return (
            <>
                <img src={PartlyCloudy}
                    alt="no picture" className="imgHold"
                />
            </>
        )
    } else if (picture > 50 && picture < 64) {
        return (
            <>
                <img src={PartlyCloudy2}
                    alt="no picture" className="imgHold"
                />
            </>
        )
    } else if (picture > 63 && picture < 77) {
        return (
            <>
                <img src={MostlyCloudy}
                    alt="no picture" className="imgHold"
                />
            </>
        )
    } else if (picture > 76 && picture < 91) {
        return (
            <>
                <img src={MostlyCloudy2}
                    alt="no picture" className="imgHold"
                />
            </>
        )
    } else if (picture > 90 && picture < 101) {
        return (
            <>
                <img src={Cloudy}
                    alt="no picture" className="imgHold"
                />
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