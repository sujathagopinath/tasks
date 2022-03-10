import React from "react";

class Message extends React.Component {
    constructor() {
        super()
        this.state = {
            message: 'wlecome state'
        }
    }

    handlechange() {
        this.setState({
            message: "welcone setstate"
        })
    }
    render() {
        return (
            <div>
                < h1 > {this.state.message}</h1 >
                <button onClick={() => this.handlechange()}>Click Here</button>
            </div>
        )
    }
}

export default Message;
