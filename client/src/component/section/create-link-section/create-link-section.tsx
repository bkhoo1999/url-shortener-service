import React, { useState } from "react";
import { connect, ExposedAction } from "react-redux";
import { bindActionCreators } from "redux";

import { State } from "../../../store";
import { actions as linksAction } from "../../../store/links";

import * as StringUtil from "../../../util/string";

import Accordion from "../../common/accordion-component";
import Textfield from "../../common/textfield-component";
import Button from "../../common/button-component";

const CreateLinkSection = (props: CreateLinkSectionProps) => {
  const { links, linksAction } = props;
  const { isFetchingLinks, isCreatingLink } = links;

  const [url, setUrl] = useState<string>("");

  const loading = isCreatingLink || isFetchingLinks;
  const formValid = !!url && StringUtil.isStringUrl(url);

  const createLink = () => {
    linksAction
      .createLink({ original_url: url })
      .catch((error) => console.error(error))
      .finally(() => {
        linksAction.fetchLinks();
        setUrl("");
      });
  };

  const renderCreateLinkContent = () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <h1 className="font-semibold text-lg">
          Welcome to Ben's URL Shortener!
        </h1>
      </div>
      <div className="col-span-2">
        <Textfield
          loading={loading}
          error={!formValid}
          label="Enter a URL"
          placeholder="URL Link ..."
          value={url}
          onChange={(value) => setUrl(value)}
        />
      </div>
      <div>
        <Button
          label="Generate URL"
          onClick={createLink}
          disabled={!formValid}
          loading={loading}
        />
        <Button
          label="Search URL"
          onClick={() => {}}
          disabled={!formValid}
          loading={loading}
        />
      </div>
      <div className="text-end">
        <Button label="Clear" onClick={() => setUrl("")} loading={loading} />
      </div>
    </div>
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
