import React from "react";
import Childcomponent from "./methodadpropchild";

class ParentComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            parentname: 'Parent1'
        }
        this.handlechange = this.handlechange.bind(this)

    }

    handlechange() {
        alert(`Hello${this.state.parentname}`)
    }
    render() {
        return (
            <div>
                <Childcomponent Handler={this.handlechange} />
            </div>
        )
    }
}

export default ParentComponent;
