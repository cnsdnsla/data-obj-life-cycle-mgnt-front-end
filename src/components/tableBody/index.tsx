type TableBodyProps = {
  children: string | React.ReactElement | React.ReactElement[];
};

const TableBody = (props: TableBodyProps) => {
  return <tbody>{props.children}</tbody>;
};

export default TableBody;
