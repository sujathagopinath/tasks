import React from "react";

function Stateless(props) {
    console.log(props)

    return (
        <div>

            <h1>Hello,{props.name}</h1>
        </div>
    );

}

export default Stateless;
