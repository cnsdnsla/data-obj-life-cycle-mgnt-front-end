import { Input, Typography } from '@material-tailwind/react';
import SimpleInput, { SimpleInputValidationRule } from '../input';
import { HTMLInputTypeAttribute } from 'react';

export enum EditableTableColumnType {
  STRING,
  NUMBER,
  SELECT,
}

export type EditableTableColumnSelectOption = {
  key: string;
  value: string;
  disable: boolean;
};

export type EditableTableColumn = {
  id: string;
  name: string;
  type: HTMLInputTypeAttribute;
  order?: number;
  options?: EditableTableColumnSelectOption[];
  sortable?: boolean;
  filterable?: boolean;
  editable?: boolean;
  validationRule?: SimpleInputValidationRule;
};

export type EditableTableCellValue = {
  columnId: string;
  value: string;
  options?: EditableTableColumnSelectOption[];
};

export type EditableTableRowValue = {
  id: string;
  cellValues: EditableTableCellValue[];
};

export type EditableTableProps = {
  columns: EditableTableColumn[];
  rowValues: EditableTableRowValue[];
};

const EditableTable = (props: EditableTableProps) => {
  const { columns, rowValues } = props;
  columns.sort((columnA, columnB) => {
    if (!columnA.order && !columnB.order) {
      return -1;
    } else if (!columnA.order && columnB.order) {
      return -1;
    } else if (columnA.order && !columnB.order) {
      return -1;
    } else if (columnA.order && columnB.order) {
      return columnA.order > columnB.order ? 1 : -1;
    } else {
      return 0;
    }
  });

  rowValues.forEach((rowValue) => {
    rowValue.cellValues.sort((cellValueA, cellValueB) => {
      const rowValueAColumnIdx = columns.findIndex((column) => {
        {
          return column.id === cellValueA.columnId;
        }
      });
      const rowValueBColumnIdx = columns.findIndex((column) => {
        {
          return column.id === cellValueB.columnId;
        }
      });

      if (rowValueAColumnIdx === -1) {
        return -1;
      } else if (rowValueBColumnIdx === -1) {
        return 1;
      } else {
        return rowValueAColumnIdx > rowValueBColumnIdx ? 1 : -1;
      }
    });
  });

  const columnMap: Map<string, EditableTableColumn> = new Map<string, EditableTableColumn>();
  columns.forEach((column) => {
    columnMap.set(column.id, column);
  });

  // const renderCellVallue = (value: EditableTableCellValue, editing: boolean) => {};

  return (
    <table className="mt-4 w-full table-fixed text-left w-full">
      <thead>
        <tr>
          {Array.from(columnMap.values()).map((column, index) => {
            return (
              <th
                key={`col_${index}`}
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                >
                  {column.name}
                </Typography>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {rowValues.map((rowValue, index) => {
          const isLast = index === rowValues.length - 1;
          const classes = isLast ? 'p-2 align-top' : 'p-2 border-b border-blue-gray-50  align-top';
          return (
            <tr key={`row_${index}`}>
              {rowValue.cellValues.map((cellValue, index) => {
                return (
                  <td key={`cell_${index}`} className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      <SimpleInput
                        name={`${rowValue.id}_${cellValue.columnId}`}
                        type={columns[index].type}
                        defaultValue={cellValue.value}
                        validationRule={columns[index].validationRule}
                      />
                    </Typography>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default EditableTable;
