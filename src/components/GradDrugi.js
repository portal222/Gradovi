import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";




function App() {

    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");
    const [error, setError ] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    


    useEffect(() => {
    
        getWeather();
    }, []);


const getWeather = async () => {
    const url = "./city.list012.json";

    try {
        const response = await axios.get(url);
        const data = response.data;
        setData(data);
        console.log('podaci drugog grada', data);
        setIsLoading(false);

    } catch (err) {

        setIsLoading(false);
        setError(err);
    }

}


    

    const search_parameters = Object.keys(Object.assign({}, ...data));
    function search(data) {
        return data.filter((data) =>
            search_parameters.some((parameter) =>
                data[parameter].toString().toLowerCase().includes(query)
            )
        );
    }

    if (isLoading) {
        return <Loader />
    }

    return (
       
           
            <tbody className="mainDiv">
                <tr>
                    <td><h2>Cities II</h2></td>
                    <td colSpan={3}>
                           <input type="search" name="search-form" id="search-form"
                    onChange={(e) => setQuery(e.target.value)} placeholder="Search cities" />
                    </td>
                </tr>
                <tr>
                    <th>City</th>
                    <th>Country</th>
                    <th>Lat</th>
                    <th>Lon</th>
                </tr>
                {search(data).map((dataObj) => {
                    return (
                        <tr key={dataObj.id} >
                            <td className="cities">{dataObj.name}</td>
                            <td className="country">{dataObj.country}</td>
                            <td>{dataObj.coord.lat}</td>
                            <td>{dataObj.coord.lon}</td>
                        </tr>

                    )

                })}
            </tbody>
       




    );
}
export default App;

