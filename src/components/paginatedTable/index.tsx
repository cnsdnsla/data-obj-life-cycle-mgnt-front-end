import { Button, IconButton, Input, Typography } from '@material-tailwind/react';
import SimpleInput, { SimpleInputValidationRule } from '../simpleInput';
import { HTMLInputTypeAttribute } from 'react';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

export type PaginatedTableColumnSelectOption = {
  key: string;
  value: string;
  disable: boolean;
};

export type PaginatedTableColumn = {
  id: string;
  name: string;
  type: HTMLInputTypeAttribute;
  order?: number;
  options?: PaginatedTableColumnSelectOption[];
  sortable?: boolean;
  filterable?: boolean;
  paginated?: boolean;
  validationRule?: SimpleInputValidationRule;
};

export type PaginatedTableCellValue = {
  columnId: string;
  value: string;
  options?: PaginatedTableColumnSelectOption[];
};

export type PaginatedTableRowValue = {
  id: string;
  cellValues: PaginatedTableCellValue[];
};

export type PaginatedTableProps = {
  columns: PaginatedTableColumn[];
  rowValues: PaginatedTableRowValue[];
};

const PaginatedTable = (props: PaginatedTableProps) => {
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

  const columnMap: Map<string, PaginatedTableColumn> = new Map<string, PaginatedTableColumn>();
  columns.forEach((column) => {
    columnMap.set(column.id, column);
  });

  // const renderCellVallue = (value: PaginatedTableCellValue, editing: boolean) => {};

  return (
    <div className="h-full flex flex-col">
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
      </div>
      <div className="grow-0">
        <div className="flex">
          <div>
            <Typography variant="small" color="blue-gray" className="font-normal">
              1 / 10 Pages
            </Typography>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default PaginatedTable;
