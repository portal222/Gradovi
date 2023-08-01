
import React, { useState, useEffect } from "react";




const Geografija = () => {

    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");

    const [error, setError] = useState(null);





    useEffect(() => {

        getCountry();
    }, [])


    const getCountry = async () => {
        const url = "https://restcountries.com/v3.1/all";
        const response = await fetch(url);
        const data = await response.json();
        console.log("ZEMlje", data);


        setData(data);
    }

    const search_parameters = Object.keys(Object.assign({}, ...data));
    function search(data) {
        return data.filter((data) =>
            search_parameters.some((parameter) =>
                data[parameter].toString().toLowerCase().includes(query)
            )
        );
    }



    return (

        <>
            

            {search(data).map((dataObj) => {

                return (

                <table key={dataObj.name.common} className="tabelaZemlje">

                    <tr className="naslov">

                        <td ><img src={dataObj.flags.png} alt="nema zastave" className="image"/></td>
                        <td><img className="imageTwo" src={dataObj.coatOfArms.png}

                            alt="no coat" /></td>
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
                    <tr>
                        <td>Lon Lat</td>
                        <td className="long">{dataObj.latlng[0] + " " + dataObj.latlng[1]}</td>
                    </tr>
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
                )
 } )}
        </>
    )

}
export default Geografija;