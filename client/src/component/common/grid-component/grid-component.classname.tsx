export enum GridComponentClass {
  GRID_CONTAINER = "grid gap-3",
}

const gridColumns = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
};

const gridWidths = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};

const gridAligns = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export const GridContainer = (column: number) => {
  const gridColumn = gridColumns?.[column] || "";
  return `${GridComponentClass.GRID_CONTAINER} ${gridColumn}`;
};

export const GridItem = (width: number, alignItem: string) => {
  const gridWidth = gridWidths?.[width] || "";
  const gridAlign = gridAligns[alignItem] || "";

  return `${gridWidth} ${gridAlign}`;
};
