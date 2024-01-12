import React from "react";

const TimeZone = (props) => {

    console.log("iz time zone komp", props.times);
return (
    <>
    <tr>
        <td>timezone</td>
        <td>{props.times.timezone}</td>
    </tr>
    </>
)
}
export default TimeZone;