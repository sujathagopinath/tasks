import { Login } from "../components/login";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Login component tests", () => {
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

  //   test("should show placeholder input field", () => {
  //     render(<Login />);
  //     const userNameField = screen.getByPlaceholderText("Username");
  //     const passwordField = screen.getByPlaceholderText("Password");
  //     expect(userNameField).toBe("sujatha");
  //     expect(passwordField).toBe("hello");
  //   });

  test("Check if the functions works", () => {
    const btnFunction = jest.fn();
    render(<Login />);
    const form = screen.getByTestId("login-form");

    fireEvent.click(screen.getByTestId("login-form"));

    expect(form).toBeInTheDocument();
    expect(btnFunction).toHaveBeenCalledTimes(0);
  });
});
