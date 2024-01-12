
import React from "react";



export default class SunriseSunset extends React.Component {




 
      
  


    render() {
  
        const timeStep = (this.props.dates.sunrise);
        const date = new Date(timeStep * 1000); // Convert Unix timestamp to milliseconds

        const timeStep2 = (this.props.dates.sunset);
        const date2 = new Date(timeStep2 * 1000); 

        // Get the various components of the date

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        const hours2 = date2.getHours();
        const minutes2 = date2.getMinutes();
        const seconds2 = date2.getSeconds();

        return (

            <>
              <tr>
                <td>Sunrise</td>
                 <td className="population">
                        {hours + ":" + minutes + ":" + seconds}
                    </td>
              </tr>
                   
             <tr>
                <td>Sunset</td>

                 <td className="population">
                        {hours2 + ":" + minutes2 + ":" + seconds2}
                    </td>
             </tr>
                   
                   
            


            </>

        )
    }
}