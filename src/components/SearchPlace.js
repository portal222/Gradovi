import React from "react";
import SearchBox from "./SearchBox";
import SearchBoxFlag from "./SearchBoxFlag";



const SearchPlace = () => {
 
    return (

        <div className="place">
            <SearchBox placeholder={'Search Countries'} linkTo={'/geografija/search'} className="search"/>
            <SearchBoxFlag placeholder={'Search Flags'} linkTo={'/geografija/searchFlag'} className="search"/>

        </div>
    )

}
export default SearchPlace;