import * as ShallowRenderer from "react-test-renderer/shallow";
import { mockStore } from "../../../util/redux";

import Accordion from "../../common/accordion-component";
import Grid from "../../common/grid-component";
import Textfield from "../../common/textfield-component";
import Button from "../../common/button-component";

import { CreateLinkSection } from "./create-link-section";

const shallowRender = ShallowRenderer.createRenderer();
shallowRender.render(<CreateLinkSection {...mockStore} />);
const result = shallowRender.getRenderOutput();

const grid = result.props.children;
const withinGrid = grid.props.children;

describe("<CreateLinkSection/> main components", () => {
  test("if <CreateLinkSection/> is a type of <Accordion />", () =>
    expect(result.type).toBe(Accordion));

  test("if <CreateLinkSection/> <Accordion /> title = 'URL Shortener'", () =>
    expect(result.props.title).toBe("URL Shortener"));

  test("if <CreateLinkSection/> has a <Grid /> to align contents", () =>
    expect(grid.type).toBe(Grid));
});

describe("<CreateLinkSection/> form components", () => {
  const formTitle = withinGrid[0].props.children;
  const textfield = withinGrid[1].props.children;
  const submissionButtons = withinGrid[2].props.children;
  const clearButton = withinGrid[3].props.children;

  test("if <CreateLinkSection/> title is a type of <h1 />", () =>
    expect(formTitle.type).toBe("h1"));

  test("if <CreateLinkSection/> form title = 'Welcome to Ben's URL Shortener!'", () =>
    expect(formTitle.props.children).toBe("Welcome to Ben's URL Shortener!"));

  test("if <CreateLinkSection/> input is a type of <Textfield />", () =>
    expect(textfield.type).toBe(Textfield));

  test("if <CreateLinkSection/> <Textfield /> label = 'Enter a URL'", () =>
    expect(textfield.props.label).toBe("Enter a URL"));

  test("if <CreateLinkSection/> <Textfield /> placeholder = 'URL Link ...'", () =>
    expect(textfield.props.placeholder).toBe("URL Link ..."));

  test("if <CreateLinkSection/> has 2 submission buttons, to search and generate URL", () =>
    expect(submissionButtons.length).toBe(2));

  test("if <CreateLinkSection/> submission buttons are a type of <Button />", () =>
    expect(
      submissionButtons.some((button) => button.type === Button)
    ).toBeTruthy());

  test("if <CreateLinkSection/> submission button to generate has label = 'Generate'", () =>
    expect(submissionButtons[0].props.label).toBe("Generate"));

  test("if <CreateLinkSection/> submission button to search has label = 'Search'", () =>
    expect(submissionButtons[1].props.label).toBe("Search"));

  test("if <CreateLinkSection/> clear button is a type of <Button />", () =>
    expect(clearButton.type).toBe(Button));

  test("if <CreateLinkSection/> clear button to clear values has label = 'Clear'", () =>
    expect(clearButton.props.label).toBe("Clear"));
});
