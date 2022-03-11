import React, { Component } from 'react'

class Lifecycle extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "testuser"
        }
        console.log('lifecycle constructor')
    }
    static getDerivedStateFromProps(props, state) {
        console.log('getDerivedStateFromProps')
        return null
    }
    componentDidMount() {
        console.log('componentDidMount')
    }
    render() {
        console.log('render')
        return (
            <div>Lifecycle</div>
        )
    }
}

export default Lifecycle
