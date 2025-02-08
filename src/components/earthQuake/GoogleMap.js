import React from "react";

const GoogleMap = (props) => {

    const lat = props.lat
    const lon = props.lon

    const googleMap = 'https://maps.google.com/maps?q=' +
        lat +
        ',' +
        lon +
        '&h1=en&z=6&output=embed'

    return (
        <>
        <iframe src={googleMap} className="maps"></iframe>
        </>
    )
}
export default GoogleMap;