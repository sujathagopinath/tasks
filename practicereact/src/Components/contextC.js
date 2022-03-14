import React from "react";
import { UserConsumer } from "./userContext";

class ContextC extends React.Component {
  render() {
    return (
      <div>
        <h4> ContextC</h4>
        <UserConsumer>
          {(name) => {
            return <h5>Hello{name}</h5>;
          }}
        </UserConsumer>
      </div>
    );
  }
}

export default ContextC
