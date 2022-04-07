import React, { Component } from "react";

type CounterProps = {
  amount: number;
  count: number;
};

class Counter extends Component<CounterProps> {
  constructor() {
    super();
    state: CounterProps = {
      count: 0,
    };
  }

  makeIncrementer = (amount: any) => () =>
    this.setState((prevState) => ({
      count: prevState.count + amount,
    }));

  increment = this.makeIncrementer(1);
  render() {
    const { count } = this.state;

    return (
      <div>
        <p>Count :{count} </p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;
