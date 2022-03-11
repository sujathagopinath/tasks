import React from "react";

class HigherOrder extends React.Component {
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
                < h4 > HigherOrder</h4>
                <button onClick={() => this.handlechange()}>Click Here{this.state.count}</button>
            </div>
        )
    }
}

export default HigherOrder;
