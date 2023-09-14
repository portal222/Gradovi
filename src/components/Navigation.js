import React from "react";
import { Link, Routes, Route, NavLink, HashRouter } from 'react-router-dom';
import Geografija from "./Geografija";
import Home from "./Home";
import SearchResutsGeog from "./SearchResultsGeog";
import SearchResutsFlag from "./SearchResultsFlag";
import SearchResultsCity from "./SearchResultsCity";

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
                <Route path="/geografija/searchFlag" element={<SearchResutsFlag/>} />
               <Route path="/searchCity" element={<SearchResultsCity />} />
            </Routes>
              <div className="home">
<div className="img"></div>
            {/* <img src="../img/politic-glob.png" alt="globus" /> */}
              </div>

        </HashRouter>
    )
}
