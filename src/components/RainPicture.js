import React, { useState } from "react";
import Snow from "../../public/assets/img/snow_1.svg"
import Snow2 from "../../public/assets/img/snow_2.svg"
import Rain from "../../public/assets/img/Rain_1.svg"
import Rain2 from "../../public/assets/img/Rain_2.svg"

const RainPicture = (props) => {

    const picture = props.rain

    if (picture == "light rain") {
        return (
            <>

                <img src={Rain}
                    alt="no picture" className="imgRain"
                />
            </>
        )
    } else if (picture == "moderate rain") {
        return (
            <>
                <img src={Rain}
                    alt="no picture" className="imgRain"
                />

            </>
        )
    } else if (picture == "heavy intensity rain") {
        return (
            <>

                <img src={Rain2}
                    alt="no picture" className="imgRain"
                />
            </>
        )
    } else if (picture == "light snow") {
        return (
            <>

                <img src={Snow}
                    alt="no picture" className="imgRain"
                />
            </>
        )
    } else if (picture == "snow") {
        return (
            <>

                <img src={Snow2}
                    alt="no picture" className="imgRain"
                />
            </>
        )
    }
}
export default RainPicture;