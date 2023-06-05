import { Typography } from '@material-tailwind/react';

type TableBodyCellProps = {
  children: string | React.ReactElement | React.ReactElement[];
};

const TableBodyCell = (props: TableBodyCellProps) => {
  return (
    <td>
      <Typography variant="small" color="blue-gray" className="font-normal">
        {props.children}
      </Typography>
    </td>
  );
};

export default TableBodyCell;
