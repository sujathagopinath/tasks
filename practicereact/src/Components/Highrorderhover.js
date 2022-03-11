import React from "react";

class HigherOrderhover extends React.Component {
    constructor() {
        super()
        this.state = {
            count: 0
        }
    }

    handlechange() {
        this.setState(prevstate => {
            return { count: prevstate.count + 1 }

        })
    }
    render() {
        return (
            <div>
                < h4 > HigherOrderhover</h4>
                <button onMouseOver={() => this.handlechange()}>Click Hover{this.state.count}</button>
            </div>
        )
    }
}

export default HigherOrderhover;
