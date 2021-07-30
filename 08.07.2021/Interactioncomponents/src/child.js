import React, { useEffect, useState } from 'react';

export default function Childcomponent(props) {

    useEffect(() => {
        console.log(props)
        document.title = props.counts


    }, [props.counts > 3])
    return (
        <div>
            <h1>New child Functions</h1>
            <h2>{props.counts}</h2>

        </div>
    )
}

