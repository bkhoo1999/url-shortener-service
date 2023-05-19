import React from "react";
import Loader from "../loading-component";
import { TextfieldComponentClass, TextfieldInput } from "./textfield-component.classname";

const TableComponent = (props: TableComponentProps) => {
  const { label, error, placeholder, loading, value, onChange } = props;

  return (
    <div>   
        <label className={TextfieldComponentClass.TEXTFIELD_LABEL}>{label}</label>
        <div className={TextfieldComponentClass.TEXTFIELD_CONTAINER}>
            <input value={value} disabled={loading} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={TextfieldInput(error, value)} required />
            {loading && (
                <div className={TextfieldComponentClass.TEXTFIELD_LOADER}>
                    <Loader />
                </div>
            )}
        </div>
    </div>
  );
};

interface TableComponentProps {
  label: string;
  placeholder?: string;
  error?: boolean;
  loading?: boolean
  value: string;
  onChange: (value) => void;
};

export default (TableComponent);
