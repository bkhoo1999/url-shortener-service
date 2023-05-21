import * as ShallowRenderer from "react-test-renderer/shallow";
import { mockStore } from "../../../util/redux";

import Table from "../../common/table-component";
import Modal from "../../common/modal-component";

import TransactionsModal from "./transactions-modal";

const mockProps = {
  open: false,
  onClose: () => {},
  transactions: mockStore?.links?.linkList[2]?.transactions,
};

const shallowRender = ShallowRenderer.createRenderer();
shallowRender.render(<TransactionsModal {...mockProps} />);
const result = shallowRender.getRenderOutput();

describe("<TransactionsModal/> main components", () => {
  test("if Transactions Modal is a type of <Modal />", () =>
    expect(result.type).toBe(Modal));

  test("if <TransactionsModal/> <Modal /> title = 'Transactions'", () =>
    expect(result.props.title).toBe("Transactions"));
});

describe("<TransactionsModal/> table", () => {
  const transactionsTable = result.props.children;
  test("if <TransactionsModal/> table is a type of <Table />", () =>
    expect(transactionsTable.type).toBe(Table));

  test("if <TransactionsModal/> <Table /> header is accurate", () =>
    expect(transactionsTable.props.dataHeader).toEqual([
      "Geolocation IP",
      "Access Date",
    ]));

  test("if <TransactionsModal/> table has 2 rows with chosen link transactions", () =>
    expect(transactionsTable.props.dataRow.length).toBe(2));

  test("if <TransactionsModal/> <Table /> data row is accurate", () => {
    const expectedRows = [
      {
        geolocationIp: "::1",
        accessDate: "20/05/2023 03:02:55",
      },
      {
        geolocationIp: "::1",
        accessDate: "20/05/2023 16:41:47",
      },
    ];

    expect(
      transactionsTable.props.dataRow.toString() === expectedRows.toString()
    ).toBeTruthy();
  });
});
