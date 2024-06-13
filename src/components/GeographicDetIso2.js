import React, { useState, useEffect } from "react";

import axios from 'axios';
import SearchPlace from "./SearchPlace";
import MapTwoToneIcon from '@mui/icons-material/MapTwoTone';
import { useNavigate, useParams } from "react-router-dom";
import SearchBox from "./SearchBox";
// import Loader from "./Loader";


const GeographicDetIso2 = (props) => {
    const [error, setError] = useState(null);
    const [countries, setCountries] = useState([]);
    const [zemlje, setZemlje] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);


    const navigate = useNavigate();




    const params = useParams();

    const isoId = params.isoId;



    useEffect(() => {
        
        getZemlje();

    }, []);

   

    const getZemlje = async () => {
        // const url = `https://api.api-ninjas.com/v1/country?iso2=${isoId}`;
        const url = `https://restcountries.com/v3.1/alpha/${isoId}`


        try {
            const response = await axios.get(url)
            //     {
            //         headers: {
            //             'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
            //         }
            //     }
            // );
            const data = response.data;

            console.log("detalji jpreko CCa2 koda ", data);


            setZemlje(data);

        } catch (err) {
            setError(err);
            // setIsLoading(false);


        }

    };

    const handleClick = (cityId) => {
        console.log("iz drzava grad", cityId);
        const LinkTo = `capital/${cityId}`;
        navigate(LinkTo);
    }




    return (
        <>
           
             {zemlje.map((dataZem) => (
                <table className="mainDiv">


                    <tbody key={dataZem.name.common}>
                        <tr>
                            <td className="countryName">
                                {dataZem.name.common}

                            </td>

                        </tr>
                        <tr>
                            <td >
                                <div className="windMain">
                                    <table className="windHold">
                                        <tbody><tr>
                                            <td
                                                className="title">
                                                Currency
                                            </td>
                                            <td colSpan={2}
                                                className="wind">
                                                {/* {dataZem.currency.name + " - " + dataZem.currency.code} */}
                                            </td>
                                        </tr>

                                           
                                        </tbody>
                                    </table>

                                </div>
                            </td>
                        </tr>



















                    </tbody>
                </table>
            ))}

        </>
    );
};
export default GeographicDetIso2;