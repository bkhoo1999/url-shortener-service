import React from "react";
import { GridContainer, GridItem } from "./grid-component.classname";

const GridComponent = (props: GridComponentProps) => {
  const { type, spacing, column, width, alignItem, children } = props;

  const renderGridContainer = () => (
    <div className={GridContainer(column, spacing)}>{children}</div>
  );

  const renderGridItem = () => (
    <div className={GridItem(width, alignItem)}>{children}</div>
  );

  return type === "container" ? renderGridContainer() : renderGridItem();
};

interface GridComponentProps extends React.PropsWithChildren {
  type: "container" | "item";
  spacing?: number;
  column?: number;
  width?: number;
  alignItem?: "left" | "center" | "right";
}

export default GridComponent;
