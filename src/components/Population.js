
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackToTop from "./BackToTop";
import SearchPlace from "./SearchPlace";
import axios from "axios";
import CountryFlag from "./CountryFlag";
import PopulationViewer from "./PopulationViewer";


const Population = () => {

    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCountry();
    }, [])

    const getCountry = async () => {
        const urlP = "https://countriesnow.space/api/v0.1/countries/population";

        try {
            const responseP = await axios.get(urlP);
            const dataP = responseP.data;

            console.log("podaci POPulacija zemalja", dataP);
            setCountries(dataP.data);

        } catch (err) {
            setError(err);
        }
    };

    return (
        <>
            <table className="tabelaZemlje">
                <tbody >
                    <tr>
                        <td colSpan={2} className="populTitl">
                            Population by region 1961 - 2018
                        </td>
                    </tr>
                    {countries.slice(0, 46).map((country, id) => (
                        <>
                            <tr key={id} className="popTr">
                                <td className="popul">
                                    {country.country}
                                </td>
                                <td className="populVal">
                                    {/* {country.populationCounts?.[57].value} */}
                                    <PopulationViewer populationCounts={country.populationCounts} />
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default Population;