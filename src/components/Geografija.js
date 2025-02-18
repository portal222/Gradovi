
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackToTop from "./BackToTop";
import SearchPlace from "./SearchPlace";
import axios from "axios";
import Loader from "./Loader";

const Geografija = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getCountry();
    }, [])

    const getCountry = async () => {
        const url = "https://restcountries.com/v3.1/all";

        try {
            const response = await axios.get(url);
            const data = response.data;
            console.log("podaci zemalja", data);
            console.log("gradovi", data.region)
            setIsLoading(false);
            setData(data);

        } catch (err) {
            setError(err);
        }
    };

    const handleClick = (drId) => {
        console.log("klik na drz", drId);
        const LinkTo = `detalji/${drId}`;
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
                {data.map((dataObj) => (
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
                ))}
            </table>
            <div>{<BackToTop />}</div>
        </>
    )
}
export default Geografija;