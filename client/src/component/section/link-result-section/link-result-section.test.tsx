import * as ShallowRenderer from "react-test-renderer/shallow";

import { mockStore } from "../../../util/redux";
import * as StringUtil from "../../../util/string";

import Accordion from "../../common/accordion-component";
import Grid from "../../common/grid-component";
import Hyperlink from "../../common/hyperlink-component";
import Button from "../../common/button-component";

import TransactionsModal from "../transactions-modal";

import { LinkResultSection } from "./link-result-section";

const shallowRender = ShallowRenderer.createRenderer();
shallowRender.render(<LinkResultSection {...mockStore} />);
const result = shallowRender.getRenderOutput();

const grid = result.props.children;
const withinGrid = grid.props.children;

describe("<LinkResultSection/> main components", () => {
  const transactionsModal = withinGrid[0];

  test("if <LinkResultSection/> is a type of <Accordion />", () =>
    expect(result.type).toBe(Accordion));

  test("if <LinkResultSection/> <Accordion /> title = 'Link Result'", () =>
    expect(result.props.title).toBe("Link Result"));

  test("if <LinkResultSection/> has a <Grid /> to align contents", () =>
    expect(grid.type).toBe(Grid));

  test("if <LinkResultSection/> has a <TransactionsModal /> to display transactions", () =>
    expect(transactionsModal.type).toBe(TransactionsModal));
});

describe("<LinkResultSection/> header", () => {
  const linkResultSectionHeader = withinGrid[1].props.children;
  const withinLinkResultSectionHeader =
    linkResultSectionHeader.props.children.props;
  const linkResultSectionTitle =
    withinLinkResultSectionHeader.children[0].props.children;
  const linkResultSectionRefresh = withinLinkResultSectionHeader.children[1];

  test("if <LinkResultSection/> header has a type of <Grid /> to align content", () =>
    expect(linkResultSectionHeader.type).toBe(Grid));

  test("if <LinkResultSection/> has a title and button", () =>
    expect(withinLinkResultSectionHeader.children.length).toBe(2));

  test("if <LinkResultSection/> title is a type of <h1 />", () =>
    expect(linkResultSectionTitle.type).toBe("h1"));

  test("if <LinkResultSection/> title message = 'Check your link results here! Search or generate a link on the left panel.'", () =>
    expect(linkResultSectionTitle.props.children).toBe(
      "Check your link results here! Search or generate a link on the left panel."
    ));

  test("if <linkResultSection/> button label = 'Refresh Link'", () =>
    expect(linkResultSectionRefresh.props.children.props.label).toBe(
      "Refresh Link"
    ));
});

describe("<LinkResultSection/> data grid", () => {
  const linkResultSectionGrid = withinGrid[2].props.children;
  const withinLinkResultSectionGrid = linkResultSectionGrid.props.children;

  test("if <LinkResultSection/> data grid is a type of <Grid />", () =>
    expect(linkResultSectionGrid.type).toBe(Grid));

  test("if <LinkResultSection/> data grid titles are accurate", () => {
    const linkResultSectionDataGridTitles = withinLinkResultSectionGrid.map(
      (grid) => {
        const dataGridReactFragment = grid.props.children[0];
        const dataGrid = dataGridReactFragment.props.children;
        return dataGrid.props.children;
      }
    );

    const expectedTitles = Object.keys(mockStore.links.currentLink || {})
      ?.filter((title) => title !== "url_slug")
      .map((title) => `${StringUtil.camelToTitleCase(title)}:`);

    expect(linkResultSectionDataGridTitles).toEqual(expectedTitles);
  });

  test("if <LinkResultSection/> data are accurate", () => {
    const linkResultSectionGridData = withinLinkResultSectionGrid
      .map((grid) => {
        const dataGridReactFragment = grid.props.children[1];
        const dataGrid = dataGridReactFragment.props.children;
        return dataGrid.type === "h1" ? dataGrid.props.children : dataGrid;
      })
      .toString();

    const expectedGridData = [
      <Hyperlink
        link="https://www.topgear.com.ph/drives/car-reviews/toyota-86-review-tguk-a2620-20220528-lfrm"
        onClick={() => {}}
      />,
      <Hyperlink link="http://localhost:3000/ha2gxe" onClick={() => {}} />,
      2,
      "2022 Toyota 86: Review, Specs, Features",
      "20/05/2023 02:51:43",
      <Button label="View" onClick={() => {}} />,
    ].toString();

    expect(linkResultSectionGridData === expectedGridData).toBe(true);
  });
});
