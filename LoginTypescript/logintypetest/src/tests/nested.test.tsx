import * as React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import toJson from "enzyme-to-json";
import Parentform from "../components/parent";
import Childform from "../components/child";

describe("render parent", () => {
  const wrapper = shallow(<Parentform />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
describe("Parent Component", () => {
  it("renders Child component", () => {
    const wrapper = shallow(<Parentform />);
    wrapper.setProps({
      state: "test",
      placeholder: "some letters",
    });
    expect(wrapper.containsMatchingElement(<Childform />)).toEqual(true);
  });
});

describe("Parent render", () => {
  jest.mock("../components/child", () => "Childform");
  it("should render the parent", () => {
    //       const props = {
    //           state: "hello",
    //   setState: (val: string)=>"world",
    //   handleOnSubmit: (e: SubmitEvent) =>void,
    //   placeholder: "tyoe some letters"
    //       };
    const tree = mount(
      <Childform>
        <Parentform />
      </Childform>
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
