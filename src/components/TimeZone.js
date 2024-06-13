import React,  { useState, useEffect } from "react";

const TimeZone = (props) => {

    const [hour, setHour] = useState([]);
    const [error, setError] = useState(null);



    useEffect(() => {
        getCityTime();
    }, []);

    const getCityTime = async () => {

        const urlTime = `https://api.api-ninjas.com/v1/worldtime?lat=45.116669&lon=21.30361`;
        // const urlTime = `https://api.api-ninjas.com/v1/worldtime?lat=${props.lat}&lon=${props.long}`;
        // const urlTime = `https://api.api-ninjas.com/v1/worldtime?timezone=Europe/London`;
    
    
        try {
            const response = await axios.get(urlTime,
                {
                    headers: {
                        'X-Api-Key': 'D+dYjCxDSm5fEkIqyoCIeA==c2GvujXTiAbMIH05'
                    }
                }
            );
    
    
            const dataTime = response.data;
            console.log("koliko je sati", dataTime);
            setHour(dataTime);
        
    
    
        } catch (err) {
            setError(err);
        
        }
    };


return (
    <>
    <tr>
        <td className="title">time</td>
        <td>{hour.hour}</td>
    </tr>
    </>
)
}
export default TimeZone;