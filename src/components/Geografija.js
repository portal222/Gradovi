
import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import BackToTop from "./BackToTop";
import SearchPlace from "./SearchPlace";
import axios from "axios";
import Loader from "./Loader";





const Geografija = () => {

    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);


    const [error, setError] = useState(null);


    const navigate = useNavigate();








    useEffect(() => {

        getCountry();
    }, [])

    //ovo dole radi ali zbog grada pretoria menjamo 
    // const getCountry = async () => {
    //     const url = "https://restcountries.com/v3.1/all";

    //     const response = await fetch(url);
    //     const data = await response.json();
    //     console.log("ZEMlje", data);


    //     setData(data);
    // }
    const getCountry = async () => {
        const url = "https://restcountries.com/v3.1/all";

        try {
            const response = await axios.get(url);
            const data = response.data;
            console.log("podaci zemalja", data);
            console.log("drzave")
            console.log("gradovi", data.region)
            setIsLoading(false);

            setData(data);

        } catch (err) {
            setError(err);
        }
    };

    const handleClick = (drId) => {
        console.log("klik nda drz",drId);
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
                            <td colSpan={2} className="name">
                                {dataObj.name.common}
                            </td>
                        </tr>
                        <tr className="name">

                            <td colSpan={2}
                            onClick={() => handleClick(dataObj.name.common)}>
                                <img src={dataObj.flags.png}
                                alt="nema zastave" className="imageDet" />
                                </td>

                        </tr>
                        <tr>
                            <td >Capital</td>
                            <td className="capital">{dataObj.capital}</td>
                        </tr>

                  

                        <tr className="region">
                            <td >Region</td>
                            <td className="nameOff">{dataObj.region}</td>
                        </tr>

                    </tbody>

                ))}
            </table>
            <div>{<BackToTop />}</div>
        </>

    )

}
export default Geografija;