import React from "react";

class EventBind extends React.Component {
    constructor() {
        super()
        this.state = {
            message: 'Hi'
        }
    }

    handlechange() {
        this.setState({
            message: "Bye"
        })
        console.log(this)

    }
    handlechanges() {
        this.setState({
            message: "GoodBye!!"
        })
    }
    render() {
        return (
            <div>
                < h1 > {this.state.message}</h1 >
                <button onClick={this.handlechange.bind(this)}>Click Me</button>
                <button onClick={() => this.handlechanges()}>Click Me!</button>
                {/* calling and returning the value*/}
            </div>
        )
    }
}

export default EventBind;
