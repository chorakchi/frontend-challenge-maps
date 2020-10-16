// @flow

import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import Selector from "./../index";

describe("Selector", () => {
  const defaultProps = {
    options: [
      { name: "Pizza", value: "Pizza" },
      { name: "Burger", value: "Burger" },
      { name: "Sushi", value: "Sushi" },
    ],
    defaultValue: "Pizza",
    label: "What would you like to eat?",
    onChange: () => {},
  };

  it("should render the Selector", () => {
    const subject = shallow(<Selector {...defaultProps} />);
    expect(subject).toHaveLength(1);
  });

  it("should render correctly and match to the Snapshot", () => {
    const subject = renderer.create(<Selector {...defaultProps} />).toJSON();
    expect(subject).toMatchSnapshot();
  });

  it("rednder correctly the options in selector", () => {
    const mockCallback = jest.fn(() => "i return something!");
    const subject = mount(
      <Selector {...defaultProps} onChange={mockCallback} />
    );
    expect(subject.find("input")).toHaveLength(defaultProps.options.length);
  });
  it("should call onChangeSelector and rednder correctly and have a key on selecting Burger", () => {
    const mockCallback = jest.fn(() => "i return something!");
    const subject = mount(
      <Selector {...defaultProps} onChange={mockCallback} />
    );
    expect(subject.find("#Burger")).toHaveLength(1);
    subject
      .find("#Burger")
      .props()
      .onChange({ target: { value: "Burger" } });
    expect(subject.find("#container-Burger").key()).toEqual("Burger");
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toBeCalledWith("Burger");
    expect(subject.state("selected")).toEqual("Burger");
  });
});
