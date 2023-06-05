type TableContainerProps = {
  children: string | React.ReactElement | React.ReactElement[];
};

const TableContainer = (props: TableContainerProps) => {
  return <div className="grow overflow-y-auto">{props.children}</div>;
};
export default TableContainer;
