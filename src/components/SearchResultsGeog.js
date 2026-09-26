import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import SearchPlace from "./SearchPlace";
import GlobalContext from "./GlobalContext";
import BackToTop from "./BackToTop";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const SearchResutsGeog = () => {
    const [error, setError] = useState(null);
    const [countries, setCountries] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState([]);

    const navigate = useNavigate();

    const globalCtx = useContext(GlobalContext);
    const drId = globalCtx.searchStringValue;

    useEffect(() => {
        getCountries();
    }, []);

    const getCountries = async () => {
        const url = `https://ridlejoke-proxy.kvaka32.workers.dev/rest?q=${drId}`
        try {
            const response = await axios.get(url);
            const data = response.data.data;
            setCountries(data.objects);
            setResults(data.objects.length);
         

            console.log("novi detalji drzava po imenu", data)
        } catch (err) {
            setError(err);

        }


    }
  

    const handleClick = (drId) => {
        console.log("klik na drz", drId);
        const LinkTo = `/detalji/${drId}`;
        navigate(LinkTo);
    }
    const handleClickCity = (cityId) => {
        console.log("klik na glavni grad", cityId);
        const LinkTo = `/cities/${cityId}`;
        navigate(LinkTo);
    }

 
        if (results == 0) {
            return (
                <>
                    <table className="tabelaZemlje">
                        <thead>
                            <tr>
                                <th><SearchPlace /></th>
                            </tr>
                            <tr>
                                <th>Nothing found for {drId}</th>
                            </tr>
                        </thead>
                    </table></>
            )
        }

    return (
        <>
            <table className="tabelaZemlje">
                <thead >
                    <tr className="results">
                        <th colSpan={2}>  {results} results for {drId}</th>
                    </tr>
                </thead>
                {countries.map((dataObj) => (
                    <tbody key={dataObj.population} >
                        <tr >
                         
                            <td colSpan={2}
                            onClick={() => {
                                handleClick(dataObj?.names?.common);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                                className="flag" >
                                <img src={dataObj?.flag?.url_png} alt="flag"
                                    className="imageFl" /></td>
                        </tr>
                        <tr>
                            <td className="region">Name:</td>
                            <td
                                onClick={() => {
                                    handleClick(dataObj?.names?.common);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="nameGeog">
                                {dataObj?.names?.common}</td>
                        </tr>
                        <tr>
                            <td className="region">Capital:</td>
                            <td
                                onClick={() => {
                                    handleClickCity(dataObj?.capitals?.[0]?.name);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="nameOffCountry">{dataObj?.capitals?.[0]?.name}</td>
                        </tr>
                        <tr>
                            <td className="region">Region:</td>
                            <td className="lang">{dataObj?.region}</td>
                        </tr>

                        <tr >
                            <td className="region">Population:</td>
                            <td className="population">{dataObj?.population}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <hr></hr>

                            </td>
                        </tr>
                    </tbody>
                ))}
            </table>
            <div>{<BackToTop />}</div>
        </>
    );
};
export default SearchResutsGeog;