export enum GridComponentClass {
  GRID_CONTAINER = "grid",
}

export const GridContainer = (column: number, spacing: number) => {
  const gridColumn = column ? `grid-cols-${column}` : "";
  const gridSpacing = spacing ? `gap-${spacing}` : "";

  return `${GridComponentClass.GRID_CONTAINER} ${gridColumn} ${gridSpacing}`;
};

export const GridItem = (width: number, alignItem: string) => {
  const gridWidth = width ? `col-span-${width}` : "";
  const gridAlign = alignItem ? `text-${alignItem}` : "";

  return `${gridWidth} ${gridAlign}`;
};
