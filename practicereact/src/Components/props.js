import React from "react";

function Props(props) {

    return (
        <div>

            <h1>Hello,{props.data}</h1>
            {props.children}
        </div>
    );

}

export default Props;
