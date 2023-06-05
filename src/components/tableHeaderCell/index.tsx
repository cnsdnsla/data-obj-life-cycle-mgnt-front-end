import { Typography } from '@material-tailwind/react';

type TableHeaderCellProps = {
  children: string | React.ReactElement | React.ReactElement[];
};

const TableHeaderCell = (props: TableHeaderCellProps) => {
  return (
    <th className="border-y border-blue-gray-100 bg-blue-gray-50 p-2 transition-colors hover:bg-blue-gray-50 sticky top-0 z-50	">
      <Typography
        variant="small"
        color="blue-gray"
        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
      >
        {props.children}
      </Typography>
    </th>
  );
};

export default TableHeaderCell;
