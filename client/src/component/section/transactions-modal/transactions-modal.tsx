import * as DateUtil from "../../../util/date";

import Modal from "../../common/modal-component";
import Table from "../../common/table-component";

const TransactionsModal = (props: TransactionsModalProps) => {
  const { transactions, open, onClose } = props;

  const TransactionsTableHeader = ["Geolocation IP", "Access Date"];

  const TransactionsTableRow = (transactions || []).map((transaction) => ({
    geolocationIp: transaction?.geolocation,
    accessDate: DateUtil.formatDate(transaction?.created_at),
  }));

  const renderTransactionsContent = () =>
    (transactions || [])?.length === 0 ? (
      <h2>No Transactions found</h2>
    ) : (
      <Table
        dataHeader={TransactionsTableHeader}
        dataRow={TransactionsTableRow}
      />
    );

  return (
    <Modal title="Click Report" open={open} onClose={onClose}>
      {renderTransactionsContent()}
    </Modal>
  );
};

interface TransactionsModalProps {
  transactions: LinksServiceType.Transaction[];
  open: boolean;
  onClose: () => void;
}

export default TransactionsModal;
