//useeffect first runs a  function

import React,{useEffect} from "react";

const Hooks = ()=>{

    useEffect(()=>{
        console.log("UseEffect");
    },[]
    );
    console.log("UseEffect1");
    return(
        <div>
            {console.log("UI rendering")}
        </div>
    )
}

export default Hooks  //useEffect1, ui rendering and useeffect