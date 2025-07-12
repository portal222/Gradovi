import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';






const CountryFlag = (props) => {
    const [error, setError] = useState(null);
    const [countries, setCountries] = useState([]);




    const country = props.country

    useEffect(() => {
        getCountries(country);
    }, [country]);

    const getCountries = async (country) => {
        const url = `https://restcountries.com/v3.1/name/${country}`
        try {
            const response = await axios.get(url);
            const data = response.data;
            setCountries(data[0]);


            console.log("novi detalji drzava", data)
        } catch (err) {
            setError(err);

        }


    }



    return (
        <>
          

                    <img src={countries?.flags?.png} alt="flag"
                        className="imageFl" />
        

          
      
        </>
    );
};
export default CountryFlag;