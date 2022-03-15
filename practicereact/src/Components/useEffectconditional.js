import React, { useState, useEffect } from "react";

function UseEffectCondFunc() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const handleClick = () => {
    setCount(count + 1);
  };
  useEffect(() => {
    console.log("UseEffect conditional render");
    document.title = `you have clicked ${count} times`;
  }, [count]);
  return (
    <div>
      <h4>UseEffectrender through Conditional render Components</h4>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleClick}>{count}Press</button>
    </div>
  );
}

export default UseEffectCondFunc;
