import React from "react";
import { Routes, Route, Link, HashRouter } from 'react-router-dom';

import GradPrvi from './components/GradPrvi';
import GradDrugi from './components/GradDrugi';
import GradTreci from './components/GradTreci';






function App() {



    return (
     
        <HashRouter basename="/">
        <table className="navigation">
            <tr >
 
                <td><Link to='/gradI' className="linkovi">Cities I</Link></td>
                <td><Link to='/gradII' className="linkovi">Cities II</Link></td>
                <td><Link to='/gradIII' className="linkovi">Cities III</Link></td>
              
            </tr>

        </table>
        <Routes>
      
            <Route path="/gradI" element={<GradPrvi />} />
            <Route path="/gradII" element={<GradDrugi />} />
            <Route path="/gradIII" element={<GradTreci />} />
           

        </Routes>


    </HashRouter>
  
    );
}
export default App;

//search preuzet sa sajta https://www.guvi.in/blog/build-a-search-filter-component-in-react-2023/