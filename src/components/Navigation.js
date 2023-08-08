import React from "react";
import { Link, Routes, Route, NavLink, HashRouter } from 'react-router-dom';
import Geografija from "./Geografija";
import Home from "./Home";
import SearchResutsGeog from "./SearchResultsGeog";
import SearchResutsFlag from "./SearchResultsFlag";

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
                <Route path="/geografija/search" element={<SearchResutsGeog/>} />
                <Route path="/geografija/searchFlag" element={<SearchResutsFlag/>} />
               
            </Routes>
              <div className="home">
            <img src="../img/politic-glob.png" alt="globus" />
              </div>

        </HashRouter>
    )
}
