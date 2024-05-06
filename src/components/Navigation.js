import React from "react";
import { Link, Routes, Route, NavLink, HashRouter } from 'react-router-dom';
import Geografija from "./Geografija";
import Home from "./Home";
import SearchResutsGeog from "./SearchResultsGeog";
import SearchResutsFlag from "./SearchResultsFlag";
import SearchResultsCity from "./SearchResultsCity";
import GeographicDetails from "./GeographicDetails"
import CityGeogDetails from "./CityGeogDetails";
import Footers from "./Footers";
import GeographicDetIso2 from "./GeographicDetIso2";

export default function Navigation() {
  return (
    <HashRouter basename="/">
      <div className="navContainer">


        <p className="linker">
          <Link to='/' className="home">
            COUNTRIES OF THE WORLD
          </Link>
        </p>







      </div>
      <Routes>

       
        <Route path="/" element={<Geografija />} />
        <Route path="/search" element={<SearchResutsGeog />} />
        <Route path="/search/detalji/:drId" element={<GeographicDetails />} />
        <Route path="/searchCity/detalji/:drId" element={<GeographicDetails />} />
        <Route path="/geografija/searchFlag" element={<SearchResutsFlag />} />
        <Route path="/geografija/searchFlag/flags/:drId" element={<GeographicDetails />} />
        <Route path="/searchCity" element={<SearchResultsCity />} />
        <Route path="/searchCity/citiesDetails/:cityId" element={<CityGeogDetails />} />
        <Route path="/searchCity/gradoviDetIso/:isoId" element={<GeographicDetIso2 />} />
        <Route path="/detalji/:drId" element={<GeographicDetails />} />
        <Route path="/search/cities/:cityId" element={<CityGeogDetails />} />
        
        <Route path="/searchCity/gradoviDetalj/:drId" element={<GeographicDetails />} />
        <Route path="search/detalji/:drId/capital/:cityId" element={<CityGeogDetails />} />
        <Route path="/detalji/:drId/capital/:cityId" element={<CityGeogDetails />} />

      </Routes>
      <div className="home">
        <div className="img"></div>
       
      </div>

      <Footers />
    </HashRouter>
  )
}
