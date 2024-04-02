import React, { useState, useEffect } from "react";











const CityAqi = (props) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);



    
    // const citySo = props.dataAir
    const citySo = props.dataAirSo.concentration
    const citySoAqi = props.dataAirSo.aqi
   
    const cityCo = props.dataAirCo.concentration
    const cityCoAqi = props.dataAirCo.aqi
    const cityO3 = props.dataAirO3.concentration
    const cityO3Aqi = props.dataAirO3.aqi
    const cityNo = props.dataAirNo.concentration
    const cityNoAqi = props.dataAirNo.aqi
    const cityPm = props.dataAirPm.concentration
    const cityPmAqi = props.dataAirPm.aqi
    const cityOverall = props.dataOverall.overall_aqi

    console.log("cestice sodiuma", citySo)



    return (
        <>
            <table className="tempHold">
          

                <tbody>


                    <tr>
                        <td colSpan={3}
                            className="popNumb" >
                            Overall Air Quality {cityOverall}
                        </td>
                    </tr>
                    <tr>


                        <td className="title2"><b>CO </b> Carbon monoxide</td>
                        <td className="temp">{cityCo} </td>
                        <td className="title2">aqi {cityCoAqi}</td>
                    </tr>
                    <tr>
                        <td className="title2"><b>SO2 </b> Sulphur dioxide</td>
                        <td className="temp">{citySo} </td>
                        <td className="title2">aqi {citySoAqi}</td>
                    </tr>
                   <tr>
                        <td className="title2"><b>O3 </b> Ozone</td>
                        <td className="temp">{cityO3} </td>
                        <td className="title2">aqi {cityO3Aqi}</td>
                    </tr>
                    <tr>
                        <td className="title2"><b>NO2 </b> Nitrogen dioxide</td>
                        <td className="temp">{cityNo} </td>
                        <td className="title2">aqi {cityNoAqi}</td>
                    </tr>
                    <tr>
                        <td className="title2"><b>PM10 </b> particulates</td>
                        <td className="temp">{cityPm} </td>
                        <td className="title2">aqi {cityPmAqi}</td>

                    </tr>







                </tbody>


            </table >


        </>

    );
};
export default CityAqi;