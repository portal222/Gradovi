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

                                            {/* <tr>
                                                <td className="title">GDP</td>
                                                <td className="wind">{dataZem.gdp} M$</td>
                                            </tr>
                                            <tr>
                                                <td className="title"> GDP growth</td>
                                                <td className="wind">{dataZem.gdp_growth} %</td>
                                            </tr>

                                            <tr>
                                                <td className="title"> GDP per capita</td>
                                                <td className="wind">{dataZem.gdp_per_capita} $</td>
                                            </tr>
                                            <tr>
                                                <td className="title">Exports</td>
                                                <td className="wind">{dataZem.exports} M$</td>
                                            </tr>
                                            <tr>
                                                <td className="title">Imports</td>
                                                <td className="wind">{dataZem.imports} M$</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table className="tempHold">
                                        <tbody>
                                            <tr>
                                                <td className="title2">
                                                    Population
                                                </td>


                                                <td className="popNumb">{dataZem.population * 1000} </td>

                                            </tr>
                                            <tr>
                                                <td className="title2">Urban Population</td>
                                                <td className="temp">{dataZem.urban_population} %</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">Population Density</td>
                                                <td className="temp">{dataZem.pop_density} %</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">Population Growth</td>
                                                <td className="temp">{dataZem.pop_growth} </td>
                                            </tr>
                                            <tr>
                                                <td className="title2">Urban Population Growth</td>
                                                <td className="temp">{dataZem.urban_population_growth} </td>
                                            </tr>

                                            <tr>
                                                <td className="title2">Fertility</td>
                                                <td className="temp">{dataZem.fertility}</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">Homicide Rate</td>
                                                <td className="temp">{dataZem.homicide_rate}</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">Life Expectancy Male - Female</td>
                                                <td className="temp">{dataZem.life_expectancy_male + " - " + dataZem.life_expectancy_female} year</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div></td>


                        </tr>
                        <tr>
                            <td >
                                <div className="windMain">
                                    <table className="windHold">
                                        <tbody>

                                  
                                            <tr>
                                                <td className="title">Forested Area</td>
                                                <td className="wind">{dataZem.forested_area} %</td>
                                            </tr>
                                            <tr>
                                                <td className="title">CO2 Emissions</td>
                                                <td className="wind">{dataZem.co2_emissions} </td>
                                            </tr>
                                            <tr>
                                                <td className="title">Threatened species</td>
                                                <td className="wind">{dataZem.threatened_species} </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                    <table className="tempHold">
                                        <tbody>
                                            <tr>
                                                <td className="title2">Employment Services</td>
                                                <td className="temp">{dataZem.employment_services} %</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">Employment Industry</td>
                                                <td className="temp">{dataZem.employment_industry} %</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">Employment Agriculture</td>
                                                <td className="temp">{dataZem.employment_agriculture} %</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">Unemployment</td>
                                                <td className="temp">{dataZem.unemployment} %</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="windMain">
                                   
                                      
                                    <table className="tempHold">
                                        <tbody>
                                            <tr>
                                                <td className="title2">Internet Users</td>
                                                <td className="temp">{dataZem.internet_users} %</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">primary school male</td>
                                                <td className="temp">{dataZem.primary_school_enrollment_male
                                                } %</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">primary school female</td>
                                                <td className="temp">{dataZem.primary_school_enrollment_female
                                                } %</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">secondary school male</td>
                                                <td className="temp">{dataZem.secondary_school_enrollment_male
                                                } %</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">secondary school female</td>
                                                <td className="temp">{dataZem.secondary_school_enrollment_female
                                                } %</td>
                                            </tr>

                                            <tr>
                                                <td className="title2">post secondary male</td>
                                                <td className="temp">{dataZem.post_secondary_enrollment_male
                                                } %</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">post secondary female</td>
                                                <td className="temp">{dataZem.post_secondary_enrollment_female
                                                } %</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">Tourists</td>
                                                <td className="temp">{dataZem.tourists * 1000}</td>
                                            </tr>
                                            <tr>
                                                <td className="title2">Refugees</td>
                                                <td className="temp">{dataZem.refugees * 1000}</td>
                                            </tr> */}
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