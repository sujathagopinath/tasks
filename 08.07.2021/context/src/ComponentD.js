import React from 'react'
import ComponentF from './ComponentF'
import Usercontext from './userContext'

class ComponentD extends React.Component {
    static contextType = Usercontext
    render() {
        return (
            <div>
                Component D context {this.context}
                <ComponentF />
            </div>
        )
    }
}

// ComponentD.contextType = Usercontext;
export default ComponentD
