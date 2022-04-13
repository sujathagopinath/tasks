import * as React from "react";
import { shallow, mount } from "enzyme";
import { Login } from "../components/login";
import { Users } from "../components/users";


it("renders the heading", () => {
  const wrapper = shallow(<Login />); //shallow to allows to test the component in isolation.
  expect(wrapper.find("h1").text()).toBe("Sign In");
});


it("renders whole component", () => {
  const component = shallow(<Login />);
  expect(component).toMatchSnapshot();
});

// test("submits username and password", () => {
//   const username = "hello";
//   const password = "world";
//   let onSubmit = jest.fn();
//   let props: CredentialsState;

//   const wrapper = mount(<Login onSubmit={onSubmit} />);

//   wrapper
//     .find({ "data-testid": "username-input" })
//     .simulate("change", { target: { value: username } });

//   wrapper
//     .find({ "data-testid": "password-input" })
//     .simulate("change", { target: { value: password } });

//   wrapper.update();
//   wrapper.find({ "data-testid": "loginForm" }).simulate("submit", {
//     preventDefault: () => {},
//   });

//   expect(onSubmit).toHaveBeenCalledTimes(1);
//   expect(onSubmit).toHaveBeenCalledWith({
//     username,
//     password,
//   });
// });

