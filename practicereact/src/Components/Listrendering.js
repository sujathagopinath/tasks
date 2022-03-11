import React from 'react'

function Listrendering() {
    const array1 = ['abc', 'xyz', 'pqr']
    return (
        <div>Listrendering
            {/* <h3>{array1[0]}</h3>
            <h3>{array1[1]}</h3>
            <h3>{array1[2]}</h3> */}

            {array1.map(name => <p>{name}</p>)}
        </div>
    )
}

export default Listrendering
