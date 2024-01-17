import React, { useState } from "react";





const CityPosition = (props) => {


    const [isOpen, setOpen] = useState(false);

    // const text je napravljen da bi moglo na klik da se prizove i kopira
    // sadrzaj koji se posle pastira u googl mapama

    const text = props.lonti[0]?.latitude + " " + props.lonti[0]?.longitude



    return (

        <>
            <td
                className="position"
                onClick={() => {
                    navigator.clipboard.writeText(text)
                }}>
                {text}



            </td>
        
        </>



    )

};
export default CityPosition;