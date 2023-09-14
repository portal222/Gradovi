
import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import BackToTop from "./BackToTop";
import SearchPlace from "./SearchPlace";
import axios from "axios";




const Geografija = () => {

    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");

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
        setData(data);

    } catch (err) {
        setError(err);
    }
}




    return (


<>
        <table className="tabelaZemlje">
            <thead >

                <tr>
                    <th colSpan={2}>
                        <SearchPlace  />
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

                        <td colSpan={2}><img src={dataObj.flags.png}
                            alt="nema zastave" className="image"/></td>

                    </tr>
                    <tr>
                        <td >Capital</td>
                        <td className="capital">{dataObj.capital}</td>
                    </tr>

                    {/* <tr>
                        <td >Serbian</td>
                        <td className="nameOff"> {dataObj.translations.srp.official}</td>
                    </tr> */}

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