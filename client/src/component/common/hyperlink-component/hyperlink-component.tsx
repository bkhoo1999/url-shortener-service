import React from "react";
import { HyperlinkComponentClass } from "./hyperlink-component-classname";

const HyperlinkComponent = (props: HyperlinkComponentProps) => {
  const { link, label } = props;
  const { HYPERLINK } = HyperlinkComponentClass

  return (
    <a href={link} target="_blank" rel="noreferrer" className={HYPERLINK}>{label || link}</a>
  );
};

interface HyperlinkComponentProps {
  link: string;
  label?: string;
};

export default (HyperlinkComponent);
