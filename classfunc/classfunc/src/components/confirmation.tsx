import React, { Component } from "react";
import {
  Form,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
} from "reactstrap";

import Step1 from "./userPersonal";
import Step2 from "./otherdetails";
import Step3 from "./success";

// import styled from "styled-components";
// import MultiStepProgressBar from "./MultiStepProgressBar";

type UserProps = {
  email: string;
  username: string;
  password: string;
};

class MasterForm extends Component {
    
    constructor(public email: string, public username: string, private password: string,
        readonly currentStep:any
    )
    {
        super()
    this.state = {
       currentStep: 1,
        email: "",
        username: "",
        password: "",
    };

    this.handleChange = this.handleChange.bind(this);

    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
  }

  handleChange(event: any) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
      const email = this.props
      const username = this.props;
       const password = this.props;
      
    alert(`Your registration detail: \n 
      Email: ${email} \n 
      Username: ${username} \n
      Password: ${password}`);
  };

  _next() {
    let currentStep = this.state.currentStep;

    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  }

  _prev() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  }

  get previousButton() {
    let currentStep = this.state.currentStep;

    if (currentStep !== 1) {
      return (
        <Button color="secondary float-left" onClick={this._prev}>
          Previous
        </Button>
      );
    }

    return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 3) {
      return (
        <Button color="primary float-right" onClick={this._next}>
          Next
        </Button>
      );
    }
    return null;
  }

  get submitButton() {
    let currentStep = this.state.currentStep;

    if (currentStep > 2) {
      return <Button color="primary float-right">Submit</Button>;
    }
    return null;
  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Card>
            <CardHeader>Create an Account</CardHeader>
            <CardBody>
              <CardTitle>
                <MultiStepProgressBar currentStep={this.state.currentStep} />
              </CardTitle>
              <CardText />
              <Step1
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                email={this.state.email}
              />
              <Step2
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                email={this.state.username}
              />
              <Step3
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                email={this.state.password}
              />
            </CardBody>
            <CardFooter>
              {this.previousButton}
              {this.nextButton}
              {this.submitButton}
            </CardFooter>
          </Card>
        </Form>
      </>
    );
  }
}

export default MasterForm;
