import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
const Test = () => {
const [value, setValue] = useState("VALUE");

setTimeout(() => {
console.log("request sent");
}, 2000);

useEffect(()=>{
    console.log("Effects")
},[])

const clickHandler = () => {
// setValue((prevState) => !prevState);
setValue((prevState => prevState+"VALUE"))
};

return (
  <div>
    <h1>{value ? "hello" : "hey"}</h1>
    <button onClick={clickHandler}>Click me</button>
  </div>
)};

export default Test