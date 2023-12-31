import React from "react";
import { Link, Routes, Route, NavLink, HashRouter } from 'react-router-dom';
import Geografija from "./Geografija";
import Home from "./Home";
import SearchResutsGeog from "./SearchResultsGeog";
import SearchResutsFlag from "./SearchResultsFlag";
import SearchResultsCity from "./SearchResultsCity";
import GeographicDetails from "./GeographicDetails"
import CityGeogDetails from "./CityGeogDetails";

export default function Navigation() {
    return (
        <HashRouter basename="/">
            <div className="navContainer">
              
             
                      <p>
                            <Link to='/' className="linker">
                          COUNTRIES OF THE WORLD
                        </Link>
                        </p>  
                
                    
                
               



            </div>
            <Routes>
               
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/" element={<Geografija />} />
                <Route path="/search" element={<SearchResutsGeog/>} />
                <Route path="/search/detalji/:drId" element={<GeographicDetails/>} />
                <Route path="/geografija/searchFlag" element={<SearchResutsFlag/>} />
                <Route path="/geografija/searchFlag/flags/:drId" element={<GeographicDetails/>} />
               <Route path="/searchCity" element={<SearchResultsCity />} />
               <Route path="/detalji/:drId" element={<GeographicDetails />} />
               <Route path="/search/cities/:cityId" element={<CityGeogDetails />} />
             
               <Route path="/searchCity/gradoviDetalj/:drId" element={<GeographicDetails />} />
               <Route path="/searchCity/citiesDetails/:cityId" element={<CityGeogDetails />} />
               <Route path="/search/detalji/capitol/:cityId" element={<CityGeogDetails />} />
            </Routes>
              <div className="home">
<div className="img"></div>
            {/* <img src="../img/politic-glob.png" alt="globus" /> */}
              </div>

        </HashRouter>
    )
}
