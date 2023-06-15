import { Checkbox } from '@material-tailwind/react';
import SimpleInput from '../simpleInput';
import Table, { TableCell, TableColumn, TableRow } from '../table';
import { useEffect, useState } from 'react';
import FilterableSelect, { FilterableSelectOption } from '../filterableSelect';
import _ from 'lodash';

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface DatagridValueOption {
  key: string;
  value: string;
  label: string | React.ReactElement;
  disabled?: boolean;
}

export interface DatagridValueValidationRule {
  required?: { value: boolean; message: string };
  min?: { value: string | number; message: string };
  max?: { value: string | number; message: string };
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
}

const DATAGRID_CELL_INPUT_TYPES = ['string', 'number', 'date', 'datetime'];
type DatagirdCellInputTuple = typeof DATAGRID_CELL_INPUT_TYPES;

const DATAGRID_CELL_CHECKBOX_TYPES = ['checkbox'];
type DatagirdCellCheckboxTuple = typeof DATAGRID_CELL_CHECKBOX_TYPES;

const DATAGRID_CELL_SELECT_TYPES = ['singleSelect', 'multiSelect'];
type DatagirdCellSelectTuple = typeof DATAGRID_CELL_SELECT_TYPES;

export type DatagridCellInputType = DatagirdCellInputTuple[number];
export type DatagridCellCheckboxType = DatagirdCellCheckboxTuple[number];
export type DatagridCellSelectType = DatagirdCellSelectTuple[number];

export interface DatagridColumn {
  key: string;
  label: string;
  type: DatagridCellInputType | DatagridCellCheckboxType | DatagridCellSelectType;
  sortable?: boolean;
  visible?: boolean;
  editable?: boolean;
  order?: number;
  valueOptions?: DatagridValueOption[];
  validationRule?: DatagridValueValidationRule;
}

export interface DatagridCell {
  key: string;
  columnKey: string;
  value: any;
  render?: string | React.ReactElement;
  editable?: boolean;
  visible?: boolean;
  valueOptions?: DatagridValueOption[];
  validationRule?: DatagridValueValidationRule;
}

export interface DatagridRow {
  id: string;
  cells: DatagridCell[];
}

export interface DatagridProps {
  sortColumnKey: string;
  sortDirection: SortDirection;
  columns: DatagridColumn[];
  rows: DatagridRow[];
}

const Datagrid = (props: DatagridProps) => {
  const [datagridColumnMap, setDatagridColumnMap] = useState<Map<string, DatagridColumn>>(new Map());

  const convertDatgridColumnToTableColumn = (): TableColumn[] => {
    const tableColumns = props.columns.map((column) => {
      return {
        key: column.key,
        label: column.label,
        sortable: column.sortable,
        visible: column.visible,
        order: column.order,
      } as TableColumn;
    });
    return tableColumns;
  };

  const convertDatagridRowsToTableRows = (): TableRow[] => {
    const tableRows: TableRow[] = props.rows.map((row) => {
      return {} as TableRow;
    });
    return tableRows;
  };

  const convertDatagridCellToTableCell = (rowKey: string, datagridCell: DatagridCell): TableCell => {
    let isEditable = false;
    let tableCellRender: string | React.ReactElement = '';
    const targetColumn = datagridColumnMap.get(datagridCell.columnKey);
    if (_.isNil(targetColumn?.editable) || targetColumn?.editable === true) isEditable = true;
    if (!_.isNil(targetColumn?.editable) && datagridCell.editable === false) isEditable = false;

    if (!isEditable) tableCellRender = datagridCell.render ? datagridCell.render : datagridCell.value;
    else {
      const targetColumn = datagridColumnMap.get(datagridCell.columnKey);
      if (targetColumn) {
        if (DATAGRID_CELL_INPUT_TYPES.includes(targetColumn.type)) {
          tableCellRender = generateTableCellInput(rowKey, datagridCell.key, targetColumn.type, datagridCell.value);
        } else if (DATAGRID_CELL_CHECKBOX_TYPES.includes(targetColumn.type)) {
          tableCellRender = generateTableCellCheckbox(rowKey, datagridCell.key, datagridCell.value as boolean);
        } else if (DATAGRID_CELL_SELECT_TYPES.includes(targetColumn.type)) {
          tableCellRender = generateTableCellSelect(
            rowKey,
            datagridCell.key,
            targetColumn.type,
            datagridCell.value,
            datagridCell.valueOptions || []
          );
        }
      }
    }
    return {
      columnKey: datagridCell.columnKey,
      value: datagridCell.value,
      render: tableCellRender,
    } as TableCell;
  };

  const generateTableCellEditTagId = (rowKey: string, cellKey: string) => {
    return `${rowKey}_${cellKey}`;
  };

  const generateTableCellInput = (
    rowKey: string,
    cellKey: string,
    type: DatagridCellInputType,
    value: string | number
  ) => {
    return (
      <SimpleInput
        id={generateTableCellEditTagId(rowKey, cellKey)}
        name={generateTableCellEditTagId(rowKey, cellKey)}
        type={type}
        defaultValue={value}
      />
    );
  };

  const generateTableCellCheckbox = (rowKey: string, cellKey: string, checked?: boolean) => {
    return (
      <Checkbox
        id={generateTableCellEditTagId(rowKey, cellKey)}
        name={generateTableCellEditTagId(rowKey, cellKey)}
        checked={checked}
      />
    );
  };

  const generateTableCellSelect = (
    rowKey: string,
    cellKey: string,
    type: DatagridCellSelectType,
    value: string | string[],
    options: DatagridValueOption[]
  ) => {
    return (
      <FilterableSelect
        id={generateTableCellEditTagId(rowKey, cellKey)}
        name={generateTableCellEditTagId(rowKey, cellKey)}
        multiple={type === 'multiSelect' ? true : false}
        selected={value}
        options={options.map((option) => {
          return {
            key: option.key,
            value: option.value,
            label: option.label,
            disabled: option.disabled,
          } as FilterableSelectOption;
        })}
      />
    );
  };

  useEffect(() => {
    setDatagridColumnMap((prev) => {
      const newDatagridColumnMap = new Map(prev);
      props.columns.forEach((column) => {
        newDatagridColumnMap.set(column.key, column);
      });
      return newDatagridColumnMap;
    });
  }, [props.columns]);

  return (
    <Table
      columns={convertDatgridColumnToTableColumn()}
      rows={convertDatagridRowToTableRow()}
      sortColumnKey={props.sortColumnKey}
      sortDirection={props.sortDirection}
    />
  );
};

export default Datagrid;
