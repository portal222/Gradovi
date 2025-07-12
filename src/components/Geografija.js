
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackToTop from "./BackToTop";
import SearchPlace from "./SearchPlace";
import axios from "axios";
import CountryFlag from "./CountryFlag";
import CityList from "./CityList";

// import Loader from "./Loader";

const Geografija = () => {

    const [countries, setCountries] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [style, setStyle] = useState("start")


    const navigate = useNavigate();

    useEffect(() => {
        getCountry();
    }, [])

    const getCountry = async () => {
        // const url = "https://restcountries.com/v3.1/all";
        // const url = "https://nominatim.openstreetmap.org/search.php?city=bern&format=jsonv2";
        const url = "https://countriesnow.space/api/v0.1/countries";
        const urlP = "https://countriesnow.space/api/v0.1/countries/population";

        try {
            const response = await axios.get(url);
            const responseP = await axios.get(urlP);
            const data = response.data.data;
            const dataP = responseP;
            console.log("podaci zemalja", data);
            console.log("podaci POPulacija zemalja", dataP);
         
            setCountries(data);

        } catch (err) {
            setError(err);
        }
    };

    const changeStyle = () => {
        console.log("klik na promenu");
        if (style !== "start") setStyle("start");
        else setStyle("end");
    }


    const handleClick = (drId) => {
        console.log("klik na drz", drId);
        const LinkTo = `detalji/${drId}`;
        navigate(LinkTo);
    }

    const cityClick = (cityId) => {
        const LinkTo = `cities/${cityId}`;
        navigate(LinkTo);
    }

    // if (isLoading) {
    //     return <Loader />
    // }

    return (
        <>
            <table className="tabelaZemlje">
                <thead >
                    <tr>
                        <th colSpan={2}>
                            <SearchPlace />
                        </th>
                    </tr>
                </thead>


                <tbody>
                    <tr>
                        <td colSpan={2} className="populTitl">
                            Countries of the world
                        </td>
                    </tr>
                    {countries.map((dataObj, id) => (
                        <tr key={id}>
                            <td>
                                <p className="nameGeog"
                                    onClick={() => {
                                        handleClick(dataObj.country, dataObj.cities);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                >

                                    {dataObj.country}
                                </p>
                                <CityList cities={dataObj.cities} />

                            </td>
                            <td className="flag"
                                onClick={() => {
                                    handleClick(dataObj.country);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}>
                                <CountryFlag country={dataObj.country} />
                            </td>
                        </tr>

                    ))}


                </tbody>

                {/* {data.map((dataObj) => (
                    <tbody key={dataObj.name.common} >
                        <tr>
                            <td
                                className="geogImg"
                                onClick={() => {
                                    handleClick(dataObj.name.common);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}>
                                <img src={dataObj.flags.png}
                                    alt="flag"
                                    className="imageDet" />
                            </td>
                            <td className="nameGeog"
                                onClick={() => {
                                    handleClick(dataObj.name.common);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}>
                                {dataObj.name.common}
                            </td>
                        </tr>
                    </tbody>
                ))} */}
            </table>
            <div style={{ height: "300px" }}></div>
            <div>{<BackToTop />}</div>
        </>
    )
}
export default Geografija;