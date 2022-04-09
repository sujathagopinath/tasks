import React from "react";
import { FormGroup, Input } from "@mui/material";

const Step1 = (props: any) => {
  if (props.currentStep !== 1) {
    return null;
  }

  return (
    <>
      <p>How can we reach you?</p>
      <FormGroup>
        <label id="email">Email</label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your Name"
          value={props.name} // Prop: The email input data
          onChange={props.handleChange} // Prop: Puts data into the state
        />
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your Email"
          value={props.email} // Prop: The email input data
          onChange={props.handleChange} // Prop: Puts data into the state
        />
        <Input
          type="number"
          name="age"
          id="age"
          placeholder="Enter your Age"
          value={props.age} // Prop: The email input data
          onChange={props.handleChange} // Prop: Puts data into the state
        />
        <Input
          type="text"
          name="dob"
          id="dob"
          placeholder="Enter your DOB"
          value={props.dob} // Prop: The email input data
          onChange={props.handleChange} // Prop: Puts data into the state
        />
      </FormGroup>
    </>
  );
};

export default Step1;
