import React from "react";
import { Link, Routes, Route, NavLink, HashRouter } from 'react-router-dom';
import Geografija from "./Geografija";
import SearchResutsGeog from "./SearchResultsGeog";
import GeographicDetails from "./GeographicDetails"

export default function Navigation() {
    return (
        <HashRouter basename="/">
            <div className="navContainer">
              
             
                      <p>
                            <Link to='/'>
                            Countries of the World
                        </Link>
                        </p>  
                
              
                    
                
               



            </div>
            <Routes>
               
                <Route path="/" element={<Geografija />} />
                <Route path="/geografija/search" element={<SearchResutsGeog/>} />
                <Route path="/details/:id" element={<GeographicDetails/>}/>
            </Routes>

        </HashRouter>
    )
}
