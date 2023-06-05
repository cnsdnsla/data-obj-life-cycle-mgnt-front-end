type TableRowProps = {
  children: string | React.ReactElement | React.ReactElement[];
};

const TableRow = (props: TableRowProps) => {
  return <tr>{props.children}</tr>;
};

export default TableRow;
