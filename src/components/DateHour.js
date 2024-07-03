
import React from "react";

const DateHour = (props) => {

  


    const timeStep = (props.time);
    const date = new Date(timeStep * 1000);

        const hours = date.getHours();




    if (hours < 10) {
        return (
            <>
            {"0" + hours + ":00"}
            </>
        );
    } else {
        return (
            <>
            {hours + ":00"}
            </>
        )
    }





}
export default DateHour;

