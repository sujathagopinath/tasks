import React from "react";

class Conditional extends React.Component {
    constructor() {
        super()
        this.state = {
            isloggedin: false
        }

    }

    render() {
        // if (this.state.isloggedin) {
        //     return (
        //         <div>Logged Out</div>
        //     )
        // }
        // else {
        //     return (
        //         <div>Logged In</div>
        //     )
        // }
        return (
            this.state.isloggedin ? <div>Logged out</div> : <div>Logged In</div>
        )
    }
}

export default Conditional;
