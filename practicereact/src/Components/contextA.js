import React from "react";
import ContextB from "./contextB";

class ContextA extends React.Component {
    constructor() {
        super()

    }


    render() {
        return (
            <div>
                < h4 > ContextA</h4>
                <ContextB />
            </div>
        )
    }
}

export default ContextA;
