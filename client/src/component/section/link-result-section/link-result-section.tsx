import React, { useState } from "react";
import { connect, ExposedAction } from "react-redux";
import { bindActionCreators } from "redux";

import { State } from "../../../store";
import { actions as linksAction } from "../../../store/links";

import * as StringUtil from "../../../util/string";
import * as DateUtil from "../../../util/date";

import Accordion from "../../common/accordion-component";
import Button from "../../common/button-component";
import Hyperlink from "../../common/hyperlink-component";
import Loader from "../../common/loading-component";
import Grid from "../../common/grid-component";

import TransactionsModal from "../transactions-modal";

let POLL_COUNT = 0;

export const LinkResultSection = (props: LinkResultSectionProps) => {
  const { links, linksAction } = props;
  const { currentLink, error, isSearchingLink, isCreatingLink } = links;

  const loading = isSearchingLink || isCreatingLink;

  const [transactionsModalOpen, setTransactionsModalOpen] =
    useState<boolean>(false);

  const refreshCurrentLink = (clicks?: number, withPoll?: boolean) => {
    linksAction
      .searchLink(currentLink?.url_slug)
      .then((res) => {
        if (withPoll && POLL_COUNT < 2 && clicks === res?.clicks) {
          POLL_COUNT++;
          refreshCurrentLink(clicks, withPoll);
        }
        POLL_COUNT = 0;
      })
      .catch((error) => console.error(error));
  };

  const renderLinkInfoTitle = () => (
    <Grid type="item">
      <Grid type="container" column={3}>
        <Grid type="item" width={2}>
          <h1 className="font-semibold text-lg pb-3">
            Check your link results here! Search or generate a link on the left
            panel.
          </h1>
        </Grid>
        {currentLink && (
          <Grid type="item" alignItem="right">
            <Button label="Refresh Link" onClick={refreshCurrentLink} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );

  const renderLinkInfoLoading = () => (
    <Grid type="item">
      <h1 className="inline-flex">
        Loading...
        <Loader />
      </h1>
    </Grid>
  );

  const renderLinkInfoError = () => (
    <Grid type="item">
      <h1 className="font-bold text-red-500 inline-flex">Error:</h1>
      <h1 className="text-red-500">{error}</h1>
    </Grid>
  );

  const renderLinkInfoData = (title: keyof LinksServiceType.Link) => {
    if (["original_url", "short_url"]?.includes(title)) {
      return (
        <Hyperlink
          link={currentLink?.[title]?.toString()}
          onClick={() =>
            title === "short_url" &&
            refreshCurrentLink(currentLink?.clicks, true)
          }
        />
      );
    }

    if (title === "transactions") {
      return (
        <Button label="View" onClick={() => setTransactionsModalOpen(true)} />
      );
    }

    if (title === "created_at") {
      return <h1>{DateUtil.formatDate(currentLink?.[title])}</h1>;
    }

    return <h1>{currentLink?.[title] || "-"}</h1>;
  };

  const renderLinkInfoSuccess = () => (
    <Grid type="item">
      <Grid type="container" column={7}>
        {Object.keys(currentLink || {})
          ?.filter((title) => title !== "url_slug")
          ?.map((title, index) => (
            <React.Fragment key={`data-grid-${title}-${index}`}>
              <Grid type="item">
                <h1 className="font-bold">{`${StringUtil.camelToTitleCase(
                  title
                )}:`}</h1>
              </Grid>
              <Grid type="item" width={6}>
                {renderLinkInfoData(title as keyof LinksServiceType.Link)}
              </Grid>
            </React.Fragment>
          ))}
      </Grid>
    </Grid>
  );

  const renderLinkResultContent = () => (
    <Grid type="container">
      <TransactionsModal
        open={transactionsModalOpen}
        onClose={() => setTransactionsModalOpen(false)}
        transactions={currentLink?.transactions}
      />
      <Grid type="item">{renderLinkInfoTitle()}</Grid>
      {loading
        ? renderLinkInfoLoading()
        : error
        ? renderLinkInfoError()
        : currentLink
        ? renderLinkInfoSuccess()
        : ""}
    </Grid>
  );

  return (
    <Accordion title="Link Result" loading={loading} expand>
      {renderLinkResultContent()}
    </Accordion>
  );
};

interface LinkResultSectionProps {
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
)(LinkResultSection);
