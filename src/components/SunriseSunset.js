
import React from "react";



export default class SunriseSunset extends React.Component {









    render() {

        const timeStep = (this.props.dates?.sunrise);
        const date = new Date(timeStep * 1000); // Convert Unix timestamp to milliseconds

        const timeStep2 = (this.props.dates?.sunset);
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
                <table className="windHold">
                    <tbody>
                        <tr>
                            <td className="title">Sunrise</td>
                            <td
                                className="wind">
                                {hours + ":" + minutes + ":" + seconds}
                            </td>
                        </tr>
                        <tr>
                            <td className="title">Sunset</td>

                            <td
                                className="wind">
                                {hours2 + ":" + minutes2 + ":" + seconds2}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className="tempHold">
                    <tbody>
                        <tr>

                            <td className="title">
                                City name
                            </td>
                            <td className="temp">
                                {this.props.cityName}
                            </td>
                        </tr>
                        <tr>
                            <td className="title">
                                Population</td>
                            <td className="temp">
                                {this.props.population}
                            </td>
                        </tr>
                    </tbody>
                </table>


            </>

        )
    }
}