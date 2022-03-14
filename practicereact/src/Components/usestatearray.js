import React, { useState } from "react";

function UseStateArray() {
  const [item, setItem] = useState([]);
  const AddItem = () => {
    setItem([
      ...item,
      {
        id: item.length,
        value: Math.random() * 10 + 1,
      },
    ]);
  };

  return (
    <div>
      Loop
      <button onClick={AddItem}>Add</button>
      <ul>
        {item.map((item) => (
          <li key={item.id}>{item.value}</li>
        ))}
      </ul>
    </div>
  );
}

export default UseStateArray;
