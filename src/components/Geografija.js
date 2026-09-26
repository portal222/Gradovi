
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackToTop from "./BackToTop";
import SearchPlace from "./SearchPlace";
import axios from "axios";
import Loader from "./Loader";

const Geografija = () => {

    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getCountry();
    }, [])

    const getCountry = async () => {

        const url = "https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,capital,cities";

        try {
            const response = await axios.get(url);
            const data = response.data.data;

            setIsLoading(false);
            setCountries(data);

        } catch (err) {
            setError(err);
            setIsLoading(false);
        }
    };

    const handleClick = (drId) => {
        const LinkTo = `/detalji/${drId}`;
        navigate(LinkTo);
    }

    const cityClick = (cityId) => {
        const LinkTo = `cities/${cityId}`;
        navigate(LinkTo);
    }

    if (isLoading) {
        return <Loader />
    }
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
                    {countries.map((dataObj) => (
                        <tr key={dataObj.name}>
                            <td className="flag"
                                onClick={() => {
                                    handleClick(dataObj.name);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}>
                                <img src={dataObj?.flag} alt="" style={{ width: "180px" }} />
                            </td>
                            <td>
                                <p className="nameGeog"
                                    onClick={() => {
                                        handleClick(dataObj?.name);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                >

                                    {dataObj?.name}
                                </p>
                                <p className="capitalGeog"
                                    onClick={() => {
                                        cityClick(dataObj?.capital);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}>
                                    {dataObj?.capital}
                                </p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ height: "300px" }}></div>
            <div>{<BackToTop />}</div>
        </>
    )
}
export default Geografija;