import React, { useState } from "react";
import Loader from "../loading-component"
import { AccordionComponentClass, AccordionComponentHeader, AccordionComponentTitleIcon } from "./accordion-component.classname";

const AccordionComponent = (props: AccordionComponentProps) => {
  const { title, loading, children } = props;
  const { ACCORDION_ARROW_ICON_PATH, ACCORDION_PADDING, ACCORDION_TITLE, ACCORDION_CONTENT } = AccordionComponentClass
  const [open, setOpen] = useState<boolean>(true);

  const renderIcon = () => (
    <svg className={AccordionComponentTitleIcon(open)} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d={ACCORDION_ARROW_ICON_PATH} />
    </svg>
  );

  return (
        <div className={ACCORDION_PADDING}>
            <h2>
                <button type="button" disabled={loading} onClick={() =>  setOpen(!open)} className={AccordionComponentHeader(open && !loading)}>
                    <span className={ACCORDION_TITLE}>
                        {title}
                        {loading && <Loader />}
                    </span>
                    {renderIcon()}
                </button>
            </h2>
            <div className={!open || loading ? "hidden" : ""}>
                <div className={ACCORDION_CONTENT}>
                    {children}
                </div>
            </div>
        </div>
  );
};

interface AccordionComponentProps extends React.PropsWithChildren {
  title: string;
  loading?: boolean;
};

export default (AccordionComponent);
