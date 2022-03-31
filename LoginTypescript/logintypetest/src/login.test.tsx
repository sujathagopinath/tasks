import { Login } from "./login";
import React from "react";
import ReactDOM from "react-dom";

describe("Login component tests", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(<Login />, container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  it("Renders correctly initial document", () => {
    const inputs = container.querySelectorAll("input");
    expect(inputs).toHaveLength(3);
    expect(inputs[0].name).toBe("login");
    expect(inputs[1].name).toBe("password");
    expect(inputs[2].value).toBe("Login");

    const label = container.querySelector("label");
    expect(label).not.toBeInTheDocument();
  });
});
