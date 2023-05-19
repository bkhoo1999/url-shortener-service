import React from "react";
import {
  ModalComponentClass,
  ModalBackdrop,
} from "./modal-component.classname";

const ModalComponent = (props: ModalComponentProps) => {
  const { title, open, onClose, children } = props;
  const {
    MODAL_OUTER_CONTAINER,
    MODAL_INNER_CONTAINER,
    MODAL_HEADER_CONTAINER,
    MODAL_TITLE,
    MODAL_CLOSE_BUTTON,
    MODAL_CLOSE_ICON,
    MODAL_CONTENT_CONTAINER,
    MODAL_CLOSE_ICON_PATH,
  } = ModalComponentClass;

  return (
    <div onClick={onClose} className={ModalBackdrop(open)}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={MODAL_OUTER_CONTAINER}
      >
        <div className={MODAL_INNER_CONTAINER}>
          <div className={MODAL_HEADER_CONTAINER}>
            <h3 className={MODAL_TITLE}>{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className={MODAL_CLOSE_BUTTON}
            >
              <svg
                className={MODAL_CLOSE_ICON}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d={MODAL_CLOSE_ICON_PATH}
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className={MODAL_CONTENT_CONTAINER}>{children}</div>
        </div>
      </div>
    </div>
  );
};

interface ModalComponentProps extends React.PropsWithChildren {
  title: string;
  open: boolean;
  onClose: () => void;
}

export default ModalComponent;
