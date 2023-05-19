import React from "react";
import Loader from "../loading-component";

import { ButtonComponentClass } from "./button-component.classname";

const ButtonComponent = (props: ButtonComponentProps) => {
  const { label, loading, disabled, onClick } = props;
  const { BUTTON } = ButtonComponentClass;

  return (
    <button type="button" onClick={onClick} disabled={loading || disabled} className={BUTTON}>
        {label}
        {loading && <Loader />}
    </button>
  );
};

interface ButtonComponentProps {
  label: string;
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export default (ButtonComponent);
