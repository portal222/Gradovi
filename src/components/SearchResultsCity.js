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
    const [page, setPage] = useState(1);
    const [results, setResults] = useState([]);

    const limit = 10;

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

            setIsLoading(false);
            setCountries(filterData);
            setResults(filterData.length);
        } catch (err) {
            setError(err);
            setIsLoading(false);
        }
    };

    const totalPages = Math.ceil(results / limit);


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
                </table>

            </>
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
                    <tr>
                        <th className="results" colSpan={2}>
                           {results} results for {searchStringValue}</th>
                    </tr>
                </thead>
                {countries.slice((page - 1) * limit, page * limit).map((dataObj) => (
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
                                <TableRow lat={dataObj.coord.lat} lon={dataObj.coord.lon} cityName={dataObj.name} />
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
            <div className="cityNum">
                {Array.from({ length: totalPages }, (_, i) => (
                    <div className={page === i + 1 ? 'numbAct' : 'numb'}
                        key={i + 1}
                        onClick={() => {
                            setPage(i + 1);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={i + 1 === page}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
            <div><BackToTop /></div>
        </>
    );
};
export default SearchResultsCity;