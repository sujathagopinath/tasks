import * as React from "react";
import { shallow, mount } from "enzyme";
import { Login } from "../components/login";
import { Users } from "../components/users";


it("renders the heading", () => {
  const wrapper = shallow(<Login />); //shallow to allows to test the component in isolation.
  expect(wrapper.find("h1").text()).toBe("Sign In");
});

// const user = {
//   name: "Darek",
//   password: "dariuszwojtowicz",
// };

// it("check the onClick callback", () => {
//   const onSubmit = jest.fn();
//   const DataInputComponent = mount(<Login user={user} />).find("input");
//   DataInputComponent.simulate("change", {
//     target: { value: "suja" },
//   });
//   expect(onSubmit).toHaveBeenCalledWith("suja");
// });

// let wrapper:any,

// beforeEach(() => {
//     wrapper = mount(<Login />);
// });
// ``
// it('should render one <Form>', () => {
//         expect(wrapper.find(Form)).toHaveLength(1);
//     });

// test("contains all users", () => {
//   const User = {
//     id: 1,
//     name: "Leanne Graham",
//   };
//   const wrapper = mount(<Users User={User} />);

//   // users.forEach((user) => {
//   expect(wrapper.text()).toMatch(User);
//   // });
// });

// test("text matches", () => {
//   const wrapper = mount(<p>Users Data</p>);
//   expect(wrapper.text()).toMatch("Users Data");
// });

it("renders whole component", () => {
  const component = shallow(<Login />);
  expect(component).toMatchSnapshot();
});

// test("submits username and password", () => {
//   const username = "hello";
//   const password = "world";
//   let onSubmit = jest.fn();

//   // const onSubmit = jest.spyOn(Login, "onSubmit");
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

