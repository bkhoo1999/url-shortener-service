import { useState } from "react";
import { connect, ExposedAction } from "react-redux";
import { bindActionCreators } from "redux";

import { State } from "../../../store";
import { actions as linksAction } from "../../../store/links";

import * as StringUtil from "../../../util/string";
import { API_URL } from "../../../util/constant";

import Accordion from "../../common/accordion-component";
import Textfield from "../../common/textfield-component";
import Button from "../../common/button-component";
import Grid from "../../common/grid-component";

const CreateLinkSection = (props: CreateLinkSectionProps) => {
  const { links, linksAction } = props;
  const { isFetchingLinks, isCreatingLink, isSearchingLink } = links;

  const [url, setUrl] = useState<string>("");

  const loading = isCreatingLink || isFetchingLinks || isSearchingLink;
  const formValid = !!url && StringUtil.isStringUrl(url);
  const searchValid =
    !!url &&
    url.includes(API_URL) &&
    StringUtil.getUrlSlug(url)?.trim()?.length === 6;

  const createLink = () =>
    linksAction
      .createLink({ original_url: url })
      .catch((error) => console.error(error))
      .finally(() => {
        linksAction.fetchLinks();
        setUrl("");
      });

  const searchLink = () =>
    linksAction
      .searchLink(StringUtil.getUrlSlug(url))
      .catch((error) => console.error(error))
      .finally(() => setUrl(""));

  const clearLink = () => {
    setUrl("");
    if (links?.currentLink || links?.error) {
      linksAction.clearLink();
    }
  };

  const renderCreateLinkContent = () => (
    <Grid type="container" column={3}>
      <Grid type="item" width={3}>
        <h1 className="font-semibold text-lg pb-3">
          Welcome to Ben's URL Shortener!
        </h1>
      </Grid>
      <Grid type="item" width={3}>
        <Textfield
          loading={loading}
          error={!formValid && !searchValid}
          label="Enter a URL"
          placeholder="URL Link ..."
          value={url}
          onChange={(value) => setUrl(value)}
        />
      </Grid>
      <Grid type="item" width={2}>
        <Button
          label="Generate"
          onClick={createLink}
          disabled={!formValid}
          loading={loading}
        />
        <Button
          label="Search"
          onClick={searchLink}
          disabled={!searchValid}
          loading={loading}
        />
      </Grid>
      <Grid type="item" alignItem="right">
        <Button label="Clear" onClick={clearLink} loading={loading} />
      </Grid>
    </Grid>
  );

  return (
    <Accordion title="URL Shortener" loading={loading} expand>
      {renderCreateLinkContent()}
    </Accordion>
  );
};

interface CreateLinkSectionProps {
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
)(CreateLinkSection);
