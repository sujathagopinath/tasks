import React, { useState } from "react";

function UseStateObject() {
  const [object, setObject] = useState({ username: "", age: "" });

  //   const handleName = (e) => {
  //     setObject(
  //       { username: e.target.value.username },
  //       { age: e.target.value.age }
  //     );
  //   };
  return (
    <div>
      UseStateObject
      <input
        type="text"
        placeholder="username"
        value={object.username}
        onChange={(e) => setObject({ ...object, username: e.target.value })}
      />
      <input
        type="number"
        placeholder="age"
        value={object.age}
        onChange={(e) => setObject({ ...object, age: e.target.value })}
      />
      <h3>{object.username}</h3>
      <h3>{object.age}</h3>
    </div>
  );
}

export default UseStateObject;
