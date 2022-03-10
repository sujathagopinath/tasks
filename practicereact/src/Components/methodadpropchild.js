import React from 'react'

function Childcomponent(props) {
    return (
        <div>
            <button onClick={props.Handler}>ParentComponent </button>
        </div>
    )
}

export default Childcomponent