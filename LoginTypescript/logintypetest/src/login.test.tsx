import { Login } from "./login";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { text } from "stream/consumers";

describe("Login component tests", () => {
  let container: HTMLDivElement;

  const onSubmit = jest.fn();
  const setup = () => render(<Login />);
  it("renders a components", () => {
    onSubmit.mockClear();
    setup();
  });

  // 2

  test("loads items eventually", async () => {
    render(<Login />);
    // Click button
    fireEvent.click(screen.getByText("Login"));
  });

  // 3

  test("click", () => {
    render(
      <div>
        <label htmlFor="checkbox">Check</label>
        <input id="checkbox" type="checkbox" />
      </div>
      // <Login />
    );
    userEvent.click(screen.getByText("Check"));
    expect(screen.getByLabelText("Check")).toBeChecked();
  });

  test("render username input", () => {
    render(<Login />);
    const inputEl = screen.getByTestId("username-input");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "text");

    const input = screen.getByTestId("username-input");
    fireEvent.change(input, { target: { value: "matti" } });
  });

  test("should show placeholder input field", () => {
    render(<Login />);
    const userNameField = screen.getByPlaceholderText("Username");
    const passwordField = screen.getByPlaceholderText("Password");
    expect(userNameField).toBe("sujatha");
    expect(passwordField).toBe("hello");
  });

  const inputsetup = () => {
    const utils = render(<Login />);
    const input = screen.getByLabelText("Name");
    return {
      input,
      ...utils,
    };
  };

  it("should submit form", async () => {
    render(<Login />);
    const change = jest.fn();
    const onSubmit = jest.fn();
    const name = screen.getByLabelText("Name");
    const password = screen.getByLabelText("Password");
    const submit = screen.getByLabelText("Submit");

    expect(name.ariaValueText).toBe("riya");
    expect(password.ariaValueText).toBe("");
    expect(change).toHaveBeenCalled();

    console.log(password);
    await userEvent.click(submit);
    expect(onSubmit).toHaveBeenCalled();
  });
});