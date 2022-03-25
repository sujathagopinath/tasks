import React from 'react'
import { PersonProps } from './personObject'

export const Person = (props: PersonProps) => {
    return (
        <div>
            {props.name.first}{props.name.last}
        </div>
    )
}