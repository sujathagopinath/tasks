import React from 'react';
import ReactDOM from 'react-dom';

class Getstateprops extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 0
        }
    }
    static getDerivedpropsandstate(props, state) {
        console.log("getderived:", props, state)
        return {
            current: props.inc * 10
        };
    }
    render() {
        console.log("render");
        return (
            <div>
                <h2>Get state and props:{this.state.current}</h2>
            </div>
        )
    }
}

export default Getstateprops;

//use Hooks lifecycle

