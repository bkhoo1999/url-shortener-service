import React, { useEffect, useState } from "react";
import { connect, ExposedAction } from "react-redux";
import { bindActionCreators } from "redux";

import { State } from "../../../store";
import { actions as linksAction } from "../../../store/links";

import Accordion from "../../common/accordion-component";
import Table from "../../common/table-component";
import Button from "../../common/button-component";
import Hyperlink from "../../common/hyperlink-component";
import TransactionsModal from "../transactions-modal/transactions-modal";

const ClickReportSection = (props: ClickReportSectionProps) => {
  const { links, linksAction } = props;
  const { linkList, isFetchingLinks } = links;

  const [state, setState] = useState<ClickReportSectionState>({
    currentTransactions: undefined,
    transactionsModalOpen: false,
  });

  const setCurrentState = (newTransactions, modalState) =>
    setState({
      currentTransactions: newTransactions,
      transactionsModalOpen: modalState,
    });

  const fetchLinks = () =>
    linksAction.fetchLinks().catch((error) => console.error(error));

  useEffect(() => {
    fetchLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { currentTransactions, transactionsModalOpen } = state;

  const clickReportTableHeader = [
    "Title",
    "Short Url",
    "Original Url",
    "Clicks",
    "Transactions",
  ];

  const clickReportTableRow = (linkList || []).map((link) => ({
    title: link?.title,
    shortUrl: <Hyperlink link={link?.short_url} onClick={fetchLinks} />,
    originalUrl: <Hyperlink link={link?.original_url} />,
    clicks: link?.clicks,
    transactions: (
      <Button
        label="View Transactions"
        disabled={(link?.transactions || [])?.length === 0}
        onClick={() => setCurrentState(link?.transactions, true)}
      />
    ),
  }));

  const renderClickReportContent = () =>
    (linkList || [])?.length === 0 ? (
      <div>No links found</div>
    ) : (
      <div>
        <h3 className="font-semibold pb-5">View your link details here!</h3>
        <Button label="Refresh" onClick={fetchLinks} />
        <Table
          dataHeader={clickReportTableHeader}
          dataRow={clickReportTableRow}
        />
        <TransactionsModal
          transactions={currentTransactions}
          open={transactionsModalOpen}
          onClose={() => setCurrentState(currentTransactions, false)}
        />
      </div>
    );

  return (
    <Accordion title="Click Report" loading={isFetchingLinks}>
      {renderClickReportContent()}
    </Accordion>
  );
};

interface ClickReportSectionState {
  transactionsModalOpen: boolean;
  currentTransactions: LinksServiceType.Transaction[];
}

interface ClickReportSectionProps {
  links?: State["links"];
  linksAction?: ExposedAction<typeof linksAction>;
}

export default connect(
  (state: State) => ({
    links: state.links,
  }),
  (dispatch: any) =>
    ({
      linksAction: bindActionCreators(linksAction, dispatch),
    } as any)
)(ClickReportSection);
