import React, { useState } from "react";

import Childform from "./child";
type FormEvent = React.FormEvent<HTMLFormElement>;
const Parentform = () => {
  const [state, setState] = useState<string>("");
  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ state });
  };
  return (
    <Childform
      state={state}
      setState={setState}
      handleOnSubmit={handleOnSubmit}
      placeholder="Type some letters"
      data-testid="output"
    />
  );
};

export default Parentform;
