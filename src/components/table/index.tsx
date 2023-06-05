type TableProps = {
  sortable?: boolean;
  children: string | React.ReactElement | React.ReactElement[];
};

const Table = (props: TableProps) => {
  return <table className="mt-2 w-full h-full table-auto text-left">{props.children}</table>;
};
export default Table;
