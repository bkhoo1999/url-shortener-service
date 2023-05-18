import React from "react";
import { connect, ExposedAction } from "react-redux";
import { bindActionCreators } from "redux";

import { State } from "../store";
import { actions as linksAction } from "../store/links";

const Main = (props: MainProps) => {
  const { linksAction } = props;
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
      onClick={() =>
        linksAction?.fetchLinks().catch((error) => console.log(error))
      }
    >
      Button
    </button>
  );
};

interface MainProps {
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
)(Main);
