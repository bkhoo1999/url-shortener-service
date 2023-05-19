export enum ModalComponentClass {
  MODAL_BACKDROP = "fixed bg-black bg-opacity-40 top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full",
  MODAL_OUTER_CONTAINER = "relative w-full max-w-4xl max-h-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2",
  MODAL_INNER_CONTAINER = "relative bg-white rounded-lg shadow",
  MODAL_HEADER_CONTAINER = "flex items-start justify-between p-4 border-b rounded-t",
  MODAL_TITLE = "text-xl font-semibold text-gray-900",
  MODAL_CLOSE_BUTTON = "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center",
  MODAL_CLOSE_ICON = "w-5 h-5",
  MODAL_CONTENT_CONTAINER = "p-6 space-y-6",
  MODAL_CLOSE_ICON_PATH = "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
}

export const ModalBackdrop = (open: boolean) =>
  `${ModalComponentClass.MODAL_BACKDROP} ${open ? "" : "hidden"}`;
