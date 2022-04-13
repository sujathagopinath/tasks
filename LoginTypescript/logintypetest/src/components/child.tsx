import React, { FormEvent, ChangeEvent } from "react";

type SubmitEvent = FormEvent<HTMLFormElement>;
type InputEvent = ChangeEvent<HTMLInputElement>;

export interface UserProps {
  state: string;
  setState: (val: string) => void;
  handleOnSubmit: (e: SubmitEvent) => void;
  placeholder: string;
};

const Childform = (props: UserProps) => {
  return (
    <form onSubmit={props.handleOnSubmit}>
      <input
        type="text"
        name="name"
        data-testid="output"
        value={props.state}
        onChange={(e: InputEvent) => props.setState(e.target.value)}
        placeholder={props.placeholder}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Childform;
