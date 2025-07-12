import React, { useState, useEffect, useContext } from "react";
import SearchPlace from "./SearchPlace";
import BackToTop from "./BackToTop";
import Loader from "./Loader";
import datas from "../../public/city.listDugacak.json";
import { useParams } from "react-router-dom";
import CityGeogDetails from "./CityGeogDetails";

const CityDetails = () => {
    const [error, setError] = useState(null);
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState([]);

    const params = useParams();
    const cityId = params.cityId;

    useEffect(() => {
        getCountries(cityId);
    }, [cityId]);

    const getCountries = (cityId) => {

        try {
            const filterData = datas.filter((city) => {
                return (
                    city.name.toLowerCase().includes(cityId.toLowerCase())
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
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <CityGeogDetails lat={countries[0]?.coord?.lat} lon={countries[0]?.coord?.lon} city={cityId} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>{<BackToTop />}</div>
        </>

    );
};
export default CityDetails;