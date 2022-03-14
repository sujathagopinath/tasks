import React from "react";
import ContextC from "./contextC";

class ContextB extends React.Component {
    constructor() {
        super()

    }


    render() {
        return (
            <div>
                < h4 > ContextB</h4>
                <ContextC />
            </div>
        )
    }
}

export default ContextB;
