import { useEffect, useState } from "react";
import { connect, ExposedAction } from "react-redux";
import { bindActionCreators } from "redux";

import { State } from "../../../store";
import { actions as linksAction } from "../../../store/links";

import * as DateUtil from "../../../util/date";

import Accordion from "../../common/accordion-component";
import Table from "../../common/table-component";
import Button from "../../common/button-component";
import Hyperlink from "../../common/hyperlink-component";
import TransactionsModal from "../transactions-modal/transactions-modal";
import Grid from "../../common/grid-component";

let POLL_COUNT = 0;

const ClickReportSection = (props: ClickReportSectionProps) => {
  const { links, linksAction } = props;
  const { linkList, isFetchingLinks } = links;

  const [error, setError] = useState<boolean>(false);

  const [state, setState] = useState<ClickReportSectionState>({
    currentTransactions: undefined,
    transactionsModalOpen: false,
  });

  const setCurrentState = (
    newTransactions: LinksServiceType.Transaction[],
    modalState: boolean
  ) =>
    setState({
      currentTransactions: newTransactions,
      transactionsModalOpen: modalState,
    });

  const fetchLinks = (link?: LinksServiceType.Link, withPoll?: boolean) =>
    linksAction
      .fetchLinks()
      .then((res) => {
        setError(false);
        const chosenLinkClick = res?.find(
          (resLink) => resLink?.url_slug === link?.url_slug
        );
        if (
          withPoll &&
          POLL_COUNT < 2 &&
          link?.clicks === chosenLinkClick?.clicks
        ) {
          POLL_COUNT++;
          fetchLinks(link, withPoll);
        }
        POLL_COUNT = 0;
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });

  useEffect(() => {
    fetchLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { currentTransactions, transactionsModalOpen } = state;

  const clickReportTableHeader = [
    "Created Date",
    "Title",
    "Short Url",
    "Original Url",
    "Clicks",
    "Transactions",
  ];

  const clickReportTableRow = (linkList || []).map((link) => ({
    createdDate: DateUtil.formatDate(link?.created_at),
    title: link?.title,
    shortUrl: (
      <Hyperlink
        link={link?.short_url}
        onClick={() => fetchLinks(link, true)}
      />
    ),
    originalUrl: <Hyperlink link={link?.original_url} />,
    clicks: link?.clicks,
    transactions: (
      <Button
        label="View"
        disabled={(link?.transactions || [])?.length === 0}
        onClick={() => setCurrentState(link?.transactions, true)}
      />
    ),
  }));

  const renderClickReportTitle = (notFound?: boolean) => (
    <Grid type="item">
      <Grid type="container" column={3}>
        <Grid type="item" width={2}>
          <h1 className="font-semibold text-lg pb-3">
            {!notFound ? "View your link details here!" : "No links found!"}
          </h1>
        </Grid>
        {(error || (links?.linkList?.length > 0 && !error)) && (
          <Grid type="item" alignItem="right">
            <Button label="Refresh List" onClick={fetchLinks} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );

  const renderClickReportContent = () =>
    (linkList || [])?.length === 0 ? (
      renderClickReportTitle(true)
    ) : (
      <Grid type="container">
        <TransactionsModal
          transactions={currentTransactions}
          open={transactionsModalOpen}
          onClose={() => setCurrentState(currentTransactions, false)}
        />
        <Grid type="item">{renderClickReportTitle()}</Grid>
        <Grid type="item">
          <Table
            dataHeader={clickReportTableHeader}
            dataRow={clickReportTableRow}
          />
        </Grid>
      </Grid>
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
