type TableHeaderProps = {
  children: string | React.ReactElement | React.ReactElement[];
};

const TableHeader = (props: TableHeaderProps) => {
  return <thead>{props.children}</thead>;
};

export default TableHeader;
