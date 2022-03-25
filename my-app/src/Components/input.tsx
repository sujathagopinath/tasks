import React from 'react'

type InputProps = {
    value: string,
    handleChange:(event:React.ChangeEvent<HTMLInputElement>)=>void
}

export const InputHandler = ({ value,handleChange}:InputProps) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event)
    }
    return (
        <div>
            <input type="text" value={value} onChange={handleChange}/>
        </div>
    )
}