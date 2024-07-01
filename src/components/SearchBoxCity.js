import React, { useRef, useContext } from "react";
import { Paper, InputBase, IconButton } from "@mui/material";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { useNavigate } from "react-router-dom";
import GlobalContext from "./GlobalContext";

const SearchBoxCity = (props) => {

    const globalCtx = useContext(GlobalContext);

    const navigate = useNavigate();
    const searchString = useRef();

    const handleClickSearch = () => {
        if (searchString.current.value.trim().length === 0) {
            return false;
        }

        globalCtx.setSearchStringFn(searchString.current.value.trim());
        navigate(props.linkTo);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleClickSearch();
        }
    };

    return (
        <Paper className="paper"
            component='form'
            se={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: '10rem',
                backgroundColor: 'red',
            }}
        >
            <InputBase className="base"
                autoFocus
                placeholder={props.placeholder}
                inputRef={searchString}
                onKeyDown={handleKeyDown}
            />
            <IconButton
                type='button'
                onClick={handleClickSearch}
                sx={{ p: '10px' }}
                aria-label='search'
            >
                <LocationCityIcon />
            </IconButton>
        </Paper>
    );
};
export default SearchBoxCity;
