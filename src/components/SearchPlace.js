import React from "react";
import SearchBox from "./SearchBox";
import SearchBoxFlag from "./SearchBoxFlag";
import SearchBoxCity from "./SearchBoxCity"



const SearchPlace = () => {
 
    return (

        <div className="place">
            <SearchBox placeholder={'Search Countries'} linkTo={'/search'} className="search"/>
           <SearchBoxCity placeholder={'Search Cities'} linkTo={'/searchCity'} className="search" />
            <SearchBoxFlag placeholder={'Search Flags'} linkTo={'/geografija/searchFlag'} className="search"/>

        </div>
    )

}
export default SearchPlace;