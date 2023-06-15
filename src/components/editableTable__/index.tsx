import { Button, IconButton, Input, Typography } from '@material-tailwind/react';
import SimpleInput, { SimpleInputValidationRule } from '../simpleInput';
import { HTMLInputTypeAttribute } from 'react';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

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
    <div className="h-full flex flex-col">
      <div className="flex gap-2 grow-0 w-full justify-end">
        <Button color="blue" size="sm" className="flex items-center">
          <PlusIcon strokeWidth={2} className="h-5 w-5" />
          Add row
        </Button>
        <Button color="blue" size="sm">
          Save
        </Button>
      </div>
      <div className="grow overflow-y-auto">
        <table className="mt-2 w-full h-full table-auto text-left">
          <thead>
            <tr>
              {Array.from(columnMap.values()).map((column, index) => {
                return (
                  <th
                    key={`col_${index}`}
                    className="border-y border-blue-gray-100 bg-blue-gray-50 p-4 transition-colors hover:bg-blue-gray-50 sticky top-0 z-50	"
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
              <th className="border-y border-blue-gray-100 bg-blue-gray-50 p-4 transition-colors hover:bg-blue-gray-50 sticky top-0 z-50	">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                >
                  Action
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto">
            {rowValues.map((rowValue, index) => {
              const isLast = index === rowValues.length - 1;
              const classes = isLast ? 'p-2 align-top' : 'p-2 border-b border-blue-gray-50 align-top';
              return (
                <tr key={`row_${index}`}>
                  {rowValue.cellValues.map((cellValue, index) => {
                    return (
                      <td key={`cell_${index}`} className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {columns[index].editable ? (
                            cellValue.value
                          ) : (
                            <SimpleInput
                              name={`${rowValue.id}_${cellValue.columnId}`}
                              type={columns[index].type}
                              defaultValue={cellValue.value}
                              validationRule={columns[index].validationRule}
                            />
                          )}
                        </Typography>
                      </td>
                    );
                  })}
                  <td className={`${classes} text-center`}>
                    <IconButton variant="text" size="sm" color="blue-gray">
                      <TrashIcon className="h-4 w-4" />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditableTable;
