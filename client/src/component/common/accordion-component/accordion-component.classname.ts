export enum AccordionComponentClass {
  ACCORDION_PADDING = "p-6",
  ACCORDION_HEADER = "flex items-center justify-between w-full p-4 font-medium text-left text-black border border-black rounded-t-xl hover:bg-gray-100",
  ACCORDION_TITLE = "flex items-center",
  ACCORDION_TITLE_ICON = "w-6 h-6 shrink-0",
  ACCORDION_CONTENT = "p-5 border border-t-0 border-b-5 border-black rounded-b-xl",
  ACCORDION_ARROW_ICON_PATH = "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
}

export const AccordionComponentHeader = (open: boolean) => {
  const borderBottom = `border-b-${open ? "0" : "5"}`;
  const borderRadius = `${!open ? "rounded-b-xl" : ""}`;

  return `${AccordionComponentClass.ACCORDION_HEADER} ${borderBottom} ${borderRadius}`;
};

export const AccordionComponentTitleIcon = (open: boolean) => {
  const rotate = `rotate-${open ? "360" : "180"}`;

  return `${AccordionComponentClass.ACCORDION_TITLE_ICON} ${rotate}`;
};
