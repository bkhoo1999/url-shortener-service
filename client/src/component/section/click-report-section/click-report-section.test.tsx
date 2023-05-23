import * as ShallowRenderer from "react-test-renderer/shallow";
import { mockStore } from "../../../util/redux";

import Accordion from "../../common/accordion-component";
import Grid from "../../common/grid-component";
import Table from "../../common/table-component";
import Hyperlink from "../../common/hyperlink-component";
import Button from "../../common/button-component";

import TransactionsModal from "../transactions-modal";

import { ClickReportSection } from "./click-report-section";

const shallowRender = ShallowRenderer.createRenderer();
shallowRender.render(<ClickReportSection {...mockStore} />);
const result = shallowRender.getRenderOutput();

const grid = result.props.children;
const withinGrid = grid.props.children;

describe("<ClickReportSection/> main components", () => {
  const transactionsModal = withinGrid[0];

  test("if <ClickReportSection/> is a type of <Accordion />", () =>
    expect(result.type).toBe(Accordion));

  test("if <ClickReportSection/> <Accordion /> title = 'Click Report'", () =>
    expect(result.props.title).toBe("Click Report"));

  test("if <ClickReportSection/> has a <Grid /> to align contents", () =>
    expect(grid.type).toBe(Grid));

  test("if <ClickReportSection/> has a <TransactionsModal /> to display transactions", () =>
    expect(transactionsModal.type).toBe(TransactionsModal));
});

describe("<ClickReportSection/> header", () => {
  const clickReportSectionHeader = withinGrid[1].props.children;
  const withinClickReportSectionHeader =
    clickReportSectionHeader.props.children.props;
  const clickReportSectionTitle =
    withinClickReportSectionHeader.children[0].props.children;
  const clickReportSectionRefresh = withinClickReportSectionHeader.children[1];

  test("if <ClickReportSection/> title is a type of <Grid />", () =>
    expect(clickReportSectionHeader.type).toBe(Grid));

  test("if <ClickReportSection/> has a title and button", () =>
    expect(withinClickReportSectionHeader.children.length).toBe(2));

  test("if <ClickReportSection/> title is a type of <h1 />", () =>
    expect(clickReportSectionTitle.type).toBe("h1"));

  test("if <ClickReportSection/> title message = 'View your link details here!'", () =>
    expect(clickReportSectionTitle.props.children).toBe(
      "View your link details here!"
    ));

  test("if <ClickReportSection/> button label = 'Refresh List'", () =>
    expect(clickReportSectionRefresh.props.children.props.label).toBe(
      "Refresh List"
    ));
});

describe("<ClickReportSection/> table", () => {
  const clickReportSectionTable = withinGrid[2].props.children;

  test("if <ClickReportSection/> table is a type of <Table />", () =>
    expect(clickReportSectionTable.type).toBe(Table));

  test("if <ClickReportSection/> <Table /> header is accurate", () =>
    expect(clickReportSectionTable.props.dataHeader).toEqual([
      "Created Date",
      "Title",
      "Short Url",
      "Original Url",
      "Clicks",
      "Transactions",
    ]));

  test("if <ClickReportSection/> table has 3 rows with links state ", () =>
    expect(clickReportSectionTable.props.dataRow.length).toBe(3));

  test("if <ClickReportSection/> <Table /> data row is accurate", () => {
    const expectedRows = [
      {
        createdDate: "21/05/2023 02:33:17",
        title: "",
        shortUrl: (
          <Hyperlink link="http://localhost:3000/t8fasx" onClick={() => {}} />
        ),
        originalUrl: (
          <Hyperlink link="https://www.notion.so/Sem-6-df08f175947241c09c9d517ab43cbdd2" />
        ),
        clicks: 1,
        transactions: (
          <Button label="View" disabled={false} onClick={() => {}} />
        ),
      },
      {
        createdDate: "20/05/2023 17:49:51",
        title: "10 Best Mockumentary Shows, According to IMDb",
        shortUrl: (
          <Hyperlink link="http://localhost:3000/ane314" onClick={() => {}} />
        ),
        originalUrl: (
          <Hyperlink link="https://collider.com/best-mockumentary-shows-imdb/" />
        ),
        clicks: 0,
        transactions: <Button label="View" disabled onClick={() => {}} />,
      },
      {
        createdDate: "20/05/2023 02:51:43",
        title: "2022 Toyota 86: Review, Specs, Features",
        shortUrl: (
          <Hyperlink link="http://localhost:3000/ha2gxe" onClick={() => {}} />
        ),
        originalUrl: (
          <Hyperlink link="https://www.topgear.com.ph/drives/car-reviews/toyota-86-review-tguk-a2620-20220528-lfrm" />
        ),
        clicks: 2,
        transactions: (
          <Button label="View" disabled={false} onClick={() => {}} />
        ),
      },
    ];

    expect(
      clickReportSectionTable.props.dataRow.toString() ===
        expectedRows.toString()
    ).toBe(true);
  });
});
