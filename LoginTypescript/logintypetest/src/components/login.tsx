import * as React from "react";
import "../assests/login.css";

export interface CredentialsState {
  userName: string;
  password: string;
  isLoggedIn: boolean;
  loginAttempted: boolean;
  checkbox: boolean;
}

interface CustomEvent {
  target: HTMLInputElement;
}

export class Login extends React.Component<{}, CredentialsState> {
  state: CredentialsState = {
    userName: "",
    password: "",
    isLoggedIn: false,
    loginAttempted: false,
    checkbox: false,
  };

  async onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    console.log("Click!!!!");
    console.log(`checked: ${this.state.checkbox}`);

    this.setState({
      loginAttempted: true,
      isLoggedIn: true,
    });
  }

  private setPassword(event: CustomEvent) {
    this.setState({ password: event.target.value });
  }
  private setUserName(event: CustomEvent) {
    this.setState({ userName: event.target.value });
  }
  private setCheck(event: CustomEvent) {
    this.setState({ checkbox: event.target.checked });
  }

  render() {
    let loginLabel;
    if (this.state.loginAttempted) {
      if (this.state.isLoggedIn) {
        loginLabel = <label>Login successful</label>;
      } else {
        loginLabel = <label>Login failed</label>;
      }
    }

    return (
      <div className="container">
        <form
          data-testid="login-form"
          className="input-form"
          onSubmit={(e) => this.onSubmit(e)}
        >
          <h1>Sign In</h1>
          <label id="username-label" className="floating__label">
            Name
          </label>
          <input
            data-testid="username-input"
            name="login"
            id="username-input"
            placeholder="Username"
            value={this.state.userName}
            onChange={(e) => this.setUserName(e)}
            type="text"
            aria-labelledby="username-label"
          />
          <label id="password-label" className="floating__label">
            Password
          </label>
          <input
            data-testid="password-input"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={(e) => this.setPassword(e)}
            type="password"
            aria-labelledby="password-label"
          />
          <label htmlFor="checkbox" className="floating__label">
            Check
          </label>
          <input
            data-testid="check-input"
            name="checkbox"
            checked={this.state.checkbox}
            onChange={(e) => this.setCheck(e)}
            type="checkbox"
          />
          <label id="submit-label" className="floating__label">
            Submit
          </label>
          <input
            data-test="submit-button"
            className="button"
            type="submit"
            value="Login"
          />
        </form>
        {loginLabel}
      </div>
    );
  }
}
