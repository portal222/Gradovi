import React from "react";
import { Link, Routes, Route, HashRouter } from 'react-router-dom';
import Button from '@mui/material/Button';

import Geografija from "./Geografija";
import SearchResutsGeog from "./SearchResultsGeog";
import SearchResutsFlag from "./SearchResultsFlag";
import SearchResultsCity from "./SearchResultsCity";
import GeographicDetails from "./GeographicDetails"
import CityDetails from "./CityDetails";
import Footers from "./Footers";
import GeographicDetIso2 from "./GeographicDetIso2";
import Quake from "./earthQuake/Quake";

export default function Navigation() {
  return (
    <HashRouter basename="/">
      <div className="navContainer">
        <div className="fixed">
           <Link to='/'>
          <Button variant="contained" sx={{ ml: 2 }}>

            COUNTRIES 
            </Button>
          </Link>
          <Link to='/quake'>
          <Button variant="contained" sx={{ ml: 2 }}>
            earthquake
            </Button>
          </Link>
        </div>
         
      </div>

      <Routes>   
        <Route path="/" element={<Geografija />} />
        <Route path="/quake" element={<Quake />} />
        <Route path="/search" element={<SearchResutsGeog />} />
        <Route path="/search/detalji/:drId" element={<GeographicDetails />} />
        <Route path="/searchCity/detalji/:drId" element={<GeographicDetails />} />
        <Route path="/geografija/searchFlag" element={<SearchResutsFlag />} />
        <Route path="/geografija/searchFlag/flags/:drId" element={<GeographicDetails />} />
        <Route path="/searchCity" element={<SearchResultsCity />} />
        <Route path="/searchCity/:cityId" element={<CityDetails />} />
        <Route path="/searchCity/gradoviDetIso/:isoId" element={<GeographicDetIso2 />} />
        <Route path="/detalji/:drId" element={<GeographicDetails />} />
        <Route path="/search/cities/:cityId" element={<CityDetails />} />  
        <Route path="/searchCity/gradoviDetalj/:drId" element={<GeographicDetails />} />
        <Route path="search/detalji/:drId/capital/:cityId" element={<CityDetails />} />
        <Route path="/detalji/:drId/capital/:cityId" element={<CityDetails />} />
        <Route path="/geografija/searchFlag/flags/:drId/capital/:cityId" element={<CityDetails />} />
      </Routes>
      <div className="home">
        <div className="img"></div>       
      </div>

      <Footers />
    </HashRouter>
  )
}
