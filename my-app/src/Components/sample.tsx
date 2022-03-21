import React from "react";

type GreetProps = {
    name:string
}
const Greet = (props:GreetProps) => {
    
    return (
        <div>
            Sample Text{props.name}
       </div> 
    )
}

export default Greet