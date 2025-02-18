import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";



const ResCountCca = (props) => {

    const [count, setCount] = useState([]);
    const [kodiran, setKodiran] = useState([]);
    const [error, setError] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {

        getCountry();
    }, [])

    const getCountry = async () => {

        const urlCount = `https://restcountries.com/v3.1/alpha/${props.code}`

        try {
            const responseCount = await axios.get(urlCount);

            const dataCount = responseCount.data

            console.log("DAJ podatke iz resCountCca", dataCount);



            setCount(dataCount);
            setKodiran(props.code);


        } catch (err) {
            setError(err);

        }
    };

    const handleCca = (drId) => {
        console.log("klik na drz", drId);
        const LinkTo = `/detalji/${drId}`;
        navigate(LinkTo);
    }

    return (
        <>
            <div>

                {count.map((cca) => (
                    <div key={cca.name.common}
                        className="nameCount"
                        onClick={() => {
                            handleCca(cca.name.common);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}>
                        {cca.name.common}
                    </div>
                ))}
            </div>
        </>
    )

}
export default ResCountCca;