
import React, { useState, useEffect } from "react";




const Geografija = () => {

    const [country, setCountry] = useState([]);




    useEffect(() => {

        getCountry();
    }, [])


    const getCountry = async () => {
        const url = "https://restcountries.com/v3.1/all";
        const response = await fetch(url);
        const data = await response.json();
        console.log("ZEMlje", data);


        setCountry(data);

    }



    return (

        <>


            {country.map(dataObj =>

                <table key={dataObj.id} className="tabelaZemlje">

                    <tr className="naslov">
                        
                        <td  className="image"><img src={dataObj.flags.png} alt="nema zastave" /></td>
                        <td  className="image"><img className="imageTwo" src={dataObj.coatOfArms.png} alt="no coat" /></td>
                    </tr>
                    <tr>
                        <td >Name</td>
                        <td className="name">{dataObj.name.common}</td>

                    </tr>
                    <tr>
                        <td >Official name</td>
                        <td className="nameOff">{dataObj.name.official}</td>
                    </tr>
                    <tr>
                        <td >Serbian</td>
                        <td className="nameOff"> {dataObj.translations.srp.official}</td>
                    </tr>
                    <tr>
                        <td >Capital</td>
                        <td className="name">{dataObj.capital}</td>
                    </tr>
                    <tr>
                        <td >Subregion</td>
                        <td>{dataObj.subregion}</td>
                    </tr>
                    {/* <tr>
                        <td>Timezones</td>
                        <td className="nameOff">{dataObj.timezones}</td>
                    </tr> */}
                    <tr>
                        <td >Population</td>
                        <td className="populacija">{dataObj.population}</td>
                    </tr>
                    <tr >
                        <td className="maps">Googlemaps</td>
                        <td className="maps">
                            <a href={dataObj.maps.googleMaps} target='_blank' >
                                maps
                            </a>
                        </td>
                    </tr>
                </table>
            )}
        </>
    )

}
export default Geografija;