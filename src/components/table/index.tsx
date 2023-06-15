import { ArrowSmallUpIcon } from '@heroicons/react/24/solid';
import { Typography } from '@material-tailwind/react';
import _ from 'lodash';
import { useState } from 'react';

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  visible?: boolean;
  order?: number;
}

export interface TableCell {
  columnKey: string;
  value: string;
  render?: string | React.ReactElement | React.ReactElement[];
}

export interface TableRow {
  id: string;
  cells: TableCell[];
}

export interface TableProps {
  sortColumnKey: string;
  sortDirection: SortDirection;
  columns: TableColumn[];
  rows: TableRow[];
}

const Table = (props: TableProps) => {
  const columns = props.columns;
  const rows: { id: string; cellMap: Map<string, TableCell> }[] = [];
  const [tableSort, setTableSort] = useState<{ sortColumnKey: string; direction: SortDirection } | null>(null);

  const initColumns = () => {
    columns.sort((columnA, columnB) => {
      if (_.isNil(columnA.order) && _.isNil(columnB.order)) {
        return 0;
      } else if (_.isNil(columnA.order) && !_.isNil(columnB.order)) {
        return 1;
      } else if (!_.isNil(columnA.order) && _.isNil(columnB.order)) {
        return -1;
      } else if (!_.isNil(columnA.order) && !_.isNil(columnB.order)) {
        return columnA.order > columnB.order ? 1 : -1;
      } else {
        return 0;
      }
    });
  };

  const initRows = () => {
    props.rows.forEach((row) => {
      rows.push(sortCells(row));
    });
  };

  const getSortedRows = () => {
    const sortedRows = [...rows];

    sortedRows.sort((a, b) => {
      let sortColumnKey = props.sortColumnKey;
      let sortDirection = props.sortDirection;
      if (!_.isNil(tableSort)) {
        sortColumnKey = tableSort.sortColumnKey;
        sortDirection = tableSort.direction;
      }
      const aCol = a.cellMap.get(sortColumnKey);
      const bCol = b.cellMap.get(sortColumnKey);
      let result = 0;

      if (_.isNil(aCol?.value) && _.isNil(bCol?.value)) {
        result = -1;
      } else if (_.isNil(aCol?.value) && !_.isNil(bCol?.value)) {
        result = 1;
      } else if (!_.isNil(aCol?.value) && _.isNil(bCol?.value)) {
        result = -1;
      } else if (!_.isNil(aCol?.value) && !_.isNil(bCol?.value)) {
        result = (aCol?.value || '') > (bCol?.value || '') ? 1 : -1;
      } else {
        result = 0;
      }
      sortDirection === SortDirection.DESC && (result *= -1);
      return result;
    });
    return sortedRows;
  };

  const sortCells = (_tableRow: TableRow) => {
    const tableRow = { id: _tableRow.id, cellMap: new Map<string, TableCell>() };
    _tableRow.cells.forEach((cell: TableCell) => {
      tableRow.cellMap.set(cell.columnKey, cell);
    });
    return tableRow;
  };

  const updateRowSort = (sortColumnKey: string) => {
    setTableSort((prev) => {
      if (_.isNil(prev) || prev.sortColumnKey !== sortColumnKey) {
        return { sortColumnKey: sortColumnKey, direction: SortDirection.ASC };
      } else {
        if (prev.direction === SortDirection.ASC) {
          return { sortColumnKey: sortColumnKey, direction: SortDirection.DESC };
        } else {
          return null;
        }
      }
    });
  };

  const renderColumn = (column: TableColumn) => {
    let arrowClsName = 'w-4 h-4 group-hover:visible';

    if (_.isNil(tableSort) || tableSort.sortColumnKey !== column.key) {
      arrowClsName += ' invisible';
    } else if (tableSort.sortColumnKey === column.key && tableSort.direction === SortDirection.DESC) {
      arrowClsName += ' rotate-180';
    }

    return (
      <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors">
        <Typography
          variant="small"
          color="blue-gray"
          className={'group flex items-center gap-2 font-normal leading-none opacity-70 cursor-pointer w-fit'}
        >
          {column.label}
          <ArrowSmallUpIcon
            strokeWidth={2}
            className={arrowClsName}
            onClick={() => {
              updateRowSort(column.key);
            }}
          />
        </Typography>
      </th>
    );
  };

  const renderColumns = () => {
    return (
      <tr>
        {columns.map((column) => {
          return renderColumn(column);
        })}
      </tr>
    );
  };

  const renderTableCell = (tableCell: TableCell) => {
    return (
      <td className="p-2 border-b border-blue-gray-50 align-top">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {tableCell.render ? tableCell.render : tableCell.value}
        </Typography>
      </td>
    );
  };

  const renderTableRow = (row: { id: string; cellMap: Map<string, TableCell> }) => {
    return (
      <tr key={`table-${row.id}`}>
        {columns.map((column: TableColumn) => {
          if (row.cellMap.has(column.key) && column.visible !== false) {
            return renderTableCell(row.cellMap.get(column.key) as TableCell);
          } else return;
        })}
      </tr>
    );
  };

  initColumns();
  initRows();

  return (
    <table className="mt-2 w-full h-full table-auto text-left">
      <thead>{renderColumns()}</thead>
      <tbody>
        {getSortedRows().map((row) => {
          return renderTableRow(row);
        })}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};
export default Table;
