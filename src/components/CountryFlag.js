import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';






const CountryFlag = (props) => {
    const [error, setError] = useState(null);
    const [countries, setCountries] = useState([]);




    const drId = props.country

    useEffect(() => {
        getCountries(drId);
    }, [drId]);

    const getCountries = async (drId) => {
        const url = `https://ridlejoke-proxy.kvaka32.workers.dev/rest?q=${drId}`
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