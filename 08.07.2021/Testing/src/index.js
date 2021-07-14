import React, { useState } from 'react';
import ReactDOM from 'react-dom'


class Testing extends React.Component {
    render() {
        return (
            <div>
                <h1>Testing</h1>
                <Button />
                <input type="text" />

            </div>
        )
    }
}
export const multiply = (num1, num2) => {
    return num1 * num2;
}
export const makelower = (val) => {
    return val.toLowerCase();
}

ReactDOM.render(<Testing />, document.getElementById('app'))

function Button() {
    const [value, setValue] = useState("Click me")

    const changeText = () => {
        setValue("You clicked");
    }
    return (
        <button onClick={changeText} title="dummybutton">{value}</button>
    )
}

export default Button;