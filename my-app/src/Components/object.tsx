import React from 'react'

type personProps = {
    name: {
        first: string
        last:string
    }
}

const Personname = (props:personProps) => {
    return (
        <div>
            {` I am ${props.name.first} ${props.name.last}`}
        </div>
    )
}

export default Personname