import React from "react";

import { PuffLoader } from 'react-spinners';

const Loader = () => {

    return (
       
           <div className="loader">
            <PuffLoader size='170px'
            color='#79d636'
             speedMultiplier= '0.2'         
            />
            </div>
      
    )

}
export default Loader;