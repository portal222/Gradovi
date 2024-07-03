
import React from "react";

const DateDays = (props) => {




    const timeStep = (props.time);
    const date = new Date(timeStep * 1000);

    const day = date.getDay();





    if (day == 1) {
        return (
            <>

                Monday
            </>
        );
    } else if (day == 2) {
        return (
            <>

                Tuesday
            </>
        )
    } else if (day == 3) {
        return (
            <>
                Wednesday
            </>
        )
    } else if (day == 4) {
        return (
            <>
                Thursday
            </>
        )
    } else if (day == 5) {
        return (
            <>
                Friday
            </>
        )
    } else if (day == 6) {
        return (
            <>
                Saturday
            </>
        )
    } else if (day == 0) {
        return (
            <>
                Sunday
            </>
        )
    }

}
export default DateDays;

