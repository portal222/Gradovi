import React, { useState } from "react";
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CityGeogDetails from "./CityGeogDetails";

const TableRow = (props) => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <tr>
                <td  >
                    <IconButton
                        aria-label='expand row'
                        size='small'
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    Position and weather</td>
            </tr>
            <tr>
                <td>

                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Box sx={{ margin: 0 }}>
                            <CityGeogDetails
                                lat={props.lat} lon={props.lon}
                            />
                        </Box>
                    </Collapse>
                </td>
            </tr>
        </>
    )
}
export default TableRow;