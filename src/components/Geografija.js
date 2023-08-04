
import React, { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import { useNavigate, useParams } from "react-router-dom";
import BackToTop from "./BackToTop";




const Geografija = () => {

    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");

    const [error, setError] = useState(null);

 
    const navigate = useNavigate();


   





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

 const handleClickCountry = (id) => {
        const LinkTo = `/details/${id}`;
        navigate(LinkTo);
    };



    return (



        <table className="tabelaZemlje">
            <thead >

                <tr>
                    <th colSpan={2}>
                        <SearchBox placeholder={'Search Country'} linkTo={'/geografija/search'} className="search" />
                    </th>
                </tr>

            </thead>
            {data.map((dataObj) => (



                <tbody key={dataObj.name.common} >


                    <tr>
                        <td colSpan={2} className="name"
                        onClick={() => 
                        handleClickCountry(dataObj.name.common)}>
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
            <tfoot>{<BackToTop />}</tfoot>
        </table>

    )

}
export default Geografija;