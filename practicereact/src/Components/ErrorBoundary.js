import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hasError: false
        }

    }
    static getDerivedStateFromProps(error) {
        return {
            hasError: true
        }
    }
    render() {

        <div>ErrorBoundary</div>
        if (this.state.hasError) {
            return <h1>something went wrong</h1>
        }
        return this.props.children

    }
}
