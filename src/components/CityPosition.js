import React, { useState } from "react";





const CityPosition = (props) => {


    const [isOpen, setOpen] = useState(false);

    // const text je napravljen da bi moglo na klik da se prizove i kopira
    // sadrzaj koji se posle pastira u googl mapama

    const text = props.lonti[0]?.coord.lat + " " + props.lonti[0]?.coord.lon



    return (

        <>
           
             
                <p className="position" 
                onClick={() => {
                    navigator.clipboard.writeText(text)
                }}>
                {text}

                </p>
             
              
           



       
        
        </>



    )

};
export default CityPosition;