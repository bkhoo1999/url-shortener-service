import React, { useState } from "react";
import Loader from "../loading-component";
import {
  AccordionComponentClass,
  AccordionComponentHeader,
  AccordionComponentTitleIcon,
} from "./accordion-component.classname";

const AccordionComponent = (props: AccordionComponentProps) => {
  const { title, loading, children, expand } = props;
  const {
    ACCORDION_ARROW_ICON_PATH,
    ACCORDION_PADDING,
    ACCORDION_TITLE,
    ACCORDION_CONTENT,
  } = AccordionComponentClass;
  const [open, setOpen] = useState<boolean>(true);

  const renderIcon = () => (
    <svg
      className={AccordionComponentTitleIcon(open)}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path fillRule="evenodd" d={ACCORDION_ARROW_ICON_PATH} />
    </svg>
  );

  return (
    <div className={ACCORDION_PADDING}>
      <h2>
        <button
          type="button"
          disabled={loading || expand}
          onClick={() => setOpen(!open)}
          className={AccordionComponentHeader((open && !loading) || expand)}
        >
          <span className={ACCORDION_TITLE}>
            {title}
            {loading && <Loader />}
          </span>
          {!expand && renderIcon()}
        </button>
      </h2>
      <div className={!open || (loading && !expand) ? "hidden" : ""}>
        <div className={ACCORDION_CONTENT}>{children}</div>
      </div>
    </div>
  );
};

interface AccordionComponentProps extends React.PropsWithChildren {
  title: string;
  loading?: boolean;
  expand?: boolean;
}

export default AccordionComponent;
