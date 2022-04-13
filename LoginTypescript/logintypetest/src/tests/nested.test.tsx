import * as React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import toJson from "enzyme-to-json";
import Parentform from "../components/parent";
import Childform, { UserProps } from "../components/child";

describe("render parent", () => {
  const wrapper = shallow(<Parentform />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
describe("Parent Component", () => {
  let props: UserProps;
  it("renders Child component", () => {
    const wrapper = shallow(<Parentform />);
    expect(wrapper.containsMatchingElement(<Childform {...props} />)).toEqual(
      true
    );
  });
});

jest.mock("../components/child", () => "Childform");

describe("Parent render", () => {
  let props: UserProps;
  it("should render the parent", () => {
    const tree = mount(
      <Childform {...props}>
        <Parentform />
      </Childform>
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
