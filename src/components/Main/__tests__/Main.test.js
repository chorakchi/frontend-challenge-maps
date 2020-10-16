// @flow

import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import Main from "./../index";

describe("Selector", () => {
  it("should render the Main", () => {
    const subject = shallow(<Main />);
    expect(subject).toHaveLength(1);
  });

  it("should render correctly and match to the Snapshot", () => {
    const subject = renderer.create(<Main />).toJSON();
    expect(subject).toMatchSnapshot();
  });
});
