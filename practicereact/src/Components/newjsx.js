import React from "react";

const Test = () => {
  return React.createElement(
    "div",
    { id: 'test' },
    React.createElement("h5", null, "Hello world")
  );
};

export default Test;
