import React, { useState, useEffect } from "react";

function UseEffectrenderFunc() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };
  useEffect(() => {
    document.title = `you have clicked ${count} times`;
  });
  return (
    <div>
      <h4>UseEffectrender through Func Components</h4>
      <h5>Count{count} </h5>
      <button onClick={handleClick}>Press</button>
    </div>
  );
}

export default UseEffectrenderFunc;
