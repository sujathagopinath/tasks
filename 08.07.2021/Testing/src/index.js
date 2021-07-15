import React, { useState } from 'react';
import ReactDOM from 'react-dom'

//Unit testing

export const add = (num1, num2) => {
    return num1 + num2;
}

export const total = (subTotal, Total) => {
    return '$' + add(subTotal, Total);
}



// function Button() {
//     const [value, setValue] = useState("Click me")

//     const changeText = () => {
//         setValue("You clicked");
//     }
//     return (
//         <button onClick={changeText} title="dummybutton">{value}</button>
//     )
// }

// export default Button;