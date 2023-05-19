import React from "react";
import { TableComponentClass } from "./table-component.classname";

const TableComponent = (props: TableComponentProps) => {
  const { dataHeader, dataRow } = props;

  return (
    <div className={TableComponentClass.TABLE_CONTAINER}>
        <table className={TableComponentClass.TABLE}>
            <thead className={TableComponentClass.TABLE_HEAD}>
                <tr>
                    {dataHeader?.map((title) => (
                        <th className={TableComponentClass.TABLE_HEAD_CELL}>
                            {title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {dataRow?.map((row, index) => (
                    <tr className={TableComponentClass.TABLE_ROW}>
                        {Object.keys(row).map((dataTitle) => (
                            <td className={TableComponentClass.TABLE_ROW_CELL}>
                                {row?.[dataTitle] || "-"}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

interface TableComponentProps {
  dataHeader: string[];
  dataRow: Record<string, any>[];
};

export default (TableComponent);
