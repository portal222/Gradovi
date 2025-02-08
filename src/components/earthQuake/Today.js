import React from "react";

const Today = (props) => {

    const unixTimestamp = props.time;
    const date = new Date(unixTimestamp);

    return (
        <>
          {date.toString().split('GMT')[0]}

        </>
    )
}
export default Today;