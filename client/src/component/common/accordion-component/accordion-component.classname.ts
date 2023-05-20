export enum AccordionComponentClass {
  ACCORDION_PADDING = "bg-white rounded-xl",
  ACCORDION_HEADER = "disabled:opacity-10 flex items-center border-b-1 justify-between w-full p-4 font-medium text-left text-black border border-black rounded-t-xl hover:bg-gray-100",
  ACCORDION_TITLE = "flex items-center",
  ACCORDION_TITLE_ICON = "w-6 h-6 shrink-0",
  ACCORDION_CONTENT = "p-5 border border-t-0 border-b-5 border-black rounded-b-xl",
  ACCORDION_ARROW_ICON_PATH = "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
}

export const AccordionComponentHeader = (open: boolean, expand: boolean) => {
  const borderRadius = !open ? "rounded-b-xl" : "";
  const cursor = expand ? "cursor-default" : "";

  return `${AccordionComponentClass.ACCORDION_HEADER} ${borderRadius} ${cursor}`;
};

export const AccordionComponentTitleIcon = (open: boolean) => {
  const rotate = open ? "rotate-360" : "rotate-180";

  return `${AccordionComponentClass.ACCORDION_TITLE_ICON} ${rotate}`;
};
