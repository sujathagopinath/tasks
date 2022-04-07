import * as React from "react";
import { shallow, mount } from "enzyme";
import { Login } from "../components/login";

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

// describe("ProductDetails component", () => {
//   var component, user:any;

//   beforeEach(() => {
//     user = {
//       name: "Darek",
//       password: "dariuszwojtowicz",
//     };
//   });
//   beforeEach(() => {
//     component = mount(<Login user={user} foo={10} />);
//   });

  
// });

let wrapper:any,

beforeEach(() => {
    wrapper = mount(<Login />);
});
``
it('should render one <Form>', () => {
        expect(wrapper.find(Form)).toHaveLength(1);
    });

it("renders whole component", () => {
  const tree = shallow(<Login />);
  expect(toJson(tree)).toMatchSnapshot();
});