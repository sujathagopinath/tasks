import React, { Component } from 'react'

class RefsDemo extends Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef()
    }
    componentDidMount() {
        this.inputRef.current.focus()
        console.log(this.inputRef)
    }
    inputHandler() {
        alert(`${this.inputRef.current.value}`)
    }
    render() {
        return (
            <div>
                Refs
                <input type="text" ref={this.inputRef} />
                <button onClick={() => this.inputHandler()}>click</button>
            </div>
        )
    }
}

export default RefsDemo
