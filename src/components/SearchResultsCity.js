import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "./GlobalContext";
import SearchPlace from "./SearchPlace";
import BackToTop from "./BackToTop";
import Loader from "./Loader";
import datas from "../../public/city.listDugacak.json";
import ResCountCca from "./ResCountCca";
import TableRow from "./TableRow";

const SearchResultsCity = () => {
    const [error, setError] = useState(null);
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState([]);

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getCountries(searchStringValue);
    }, [searchStringValue]);

    const getCountries = (searchStringValue) => {
        try {
            const filterData = datas.filter((city) => {
                return (
                    city.name.toLowerCase().includes(searchStringValue.toLowerCase())
                )
            });
            console.log("spisak gradova", datas);
            console.log("Pretraga gradova", filterData);
            setIsLoading(false);

            setCountries(filterData);
            setResults(filterData.length);
        } catch (err) {
            setError(err);
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loader />
    } else if (results == 0) {
        return (
            <>
                <table className="tabelaZemlje">
                    <thead>
                        <tr>
                            <th><SearchPlace /></th>
                        </tr>
                        <tr>
                            <th>Nothing found</th>
                        </tr>
                    </thead>
                </table></>
        )
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
                    <tr className="results">
                        <th colSpan={2}>Number of cities {results}</th>
                    </tr>
                </thead>
                {countries.map((dataObj) => (
                    <tbody key={dataObj.id} >
                        <tr>
                            <td className="nameCity">
                                {dataObj.name}</td>
                            <td style={{ fontWeight: "bold", paddingTop: "5px" }}>
                                {dataObj.country}
                                <ResCountCca code={dataObj.country} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <TableRow lat={dataObj.coord.lat} lon={dataObj.coord.lon} cityName={dataObj.name}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <hr></hr>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table>
            <div className="interspace"></div>
            <div><BackToTop /></div>
        </>
    );
};
export default SearchResultsCity;