import Table, { SortDirection } from '@/components/table';
import { Checkbox, Input } from '@material-tailwind/react';

const columns = [
  {
    key: 'key1',
    label: 'Member',
  },
  {
    key: 'key2',
    label: 'label2',
  },
  {
    key: 'key3',
    label: 'label3',
  },
  {
    key: 'key4',
    label: 'label4',
  },
  {
    key: 'key5',
    label: 'label5',
  },
  {
    key: 'key6',
    label: 'label6',
    // order: 0,
  },
];

const rows = [
  {
    id: 'row1',
    cells: [
      {
        columnKey: 'key1',
        value: 'Row1-1',
        render: 'Row1-1',
      },
      {
        columnKey: 'key2',
        value: 'Row1-2',
        render: 'Row1-2',
      },
      {
        columnKey: 'key3',
        value: 'Row1-3',
        render: 'Row1-3',
      },
      {
        columnKey: 'key4',
        value: 'Row1-4',
        render: 'Row1-4',
      },
      {
        columnKey: 'key5',
        value: 'Row1-5',
        render: 'Row1-5',
      },
      {
        columnKey: 'key6',
        value: 'Row1-6',
        render: 'Row1-6',
      },
    ],
  },
  {
    id: 'row2',
    cells: [
      {
        columnKey: 'key1',
        value: 'Row2-1',
        render: 'Row2-1',
      },
      {
        columnKey: 'key2',
        value: 'Row2-2',
        render: 'Row2-2',
      },
      {
        columnKey: 'key3',
        value: 'Row2-3',
        render: 'Row2-3',
      },
      {
        columnKey: 'key4',
        value: 'Row2-4',
        render: 'Row2-4',
      },
      {
        columnKey: 'key5',
        value: 'Row2-5',
        render: 'Row2-5',
      },
      {
        columnKey: 'key6',
        value: 'Row2-6',
        render: 'Row2-6',
      },
    ],
  },
  {
    id: 'row3',
    cells: [
      {
        columnKey: 'key1',
        value: 'Row3-1',
        render: 'Row3-1',
      },
      {
        columnKey: 'key2',
        value: 'Row3-2',
        render: 'Row3-2',
      },
      {
        columnKey: 'key3',
        value: 'Row3-3',
        render: 'Row3-3',
      },
      {
        columnKey: 'key4',
        value: 'Row3-4',
        render: 'Row3-4',
      },
      {
        columnKey: 'key5',
        value: 'Row3-5',
        render: 'Row3-5',
      },
      {
        columnKey: 'key6',
        value: 'Row3-6',
        render: 'Row3-6',
      },
    ],
  },
  {
    id: 'row4',
    cells: [
      {
        columnKey: 'key1',
        value: 'Row4-1',
        render: 'Row4-1',
      },
      {
        columnKey: 'key2',
        value: 'Row4-2',
        render: 'Row4-2',
      },
      {
        columnKey: 'key3',
        value: 'Row4-3',
        render: 'Row4-3',
      },
      {
        columnKey: 'key4',
        value: 'Row4-4',
        render: 'Row4-4',
      },
      {
        columnKey: 'key5',
        value: 'Row4-5',
        render: 'Row4-5',
      },
      {
        columnKey: 'key6',
        value: 'Row4-6',
        render: 'Row4-6',
      },
    ],
  },
  {
    id: 'row5',
    cells: [
      {
        columnKey: 'key1',
        value: 'Row5-1',
        render: 'Row5-1',
      },
      {
        columnKey: 'key2',
        value: 'Row5-2',
        render: 'Row5-2',
      },
      {
        columnKey: 'key3',
        value: 'Row5-3',
        render: 'Row5-3',
      },
      {
        columnKey: 'key4',
        value: 'Row5-4',
        render: 'Row5-4',
      },
      {
        columnKey: 'key5',
        value: 'Row5-5',
        render: 'Row5-5',
      },
      {
        columnKey: 'key6',
        value: 'Row5-6',
        render: 'Row5-6',
      },
    ],
  },
  {
    id: 'row6',
    cells: [
      {
        columnKey: 'key1',
        value: 'Row6-1',
        render: 'Row6-1',
      },
      {
        columnKey: 'key2',
        value: 'Row6-2',
        render: 'Row6-2',
      },
      {
        columnKey: 'key3',
        value: 'Row6-3',
        render: 'Row6-3',
      },
      {
        columnKey: 'key4',
        value: 'Row6-4',
        render: 'Row6-4',
      },
      {
        columnKey: 'key5',
        value: 'Row6-5',
        render: 'Row6-5',
      },
      {
        columnKey: 'key6',
        value: 'Row6-6',
        render: 'Row6-6',
      },
    ],
  },
];

const UserAuthorizationPage = () => {
  return (
    <>
      <Table columns={columns} rows={rows} sortColumnKey="key1" sortDirection={SortDirection.DESC} />
    </>
  );
};

export default UserAuthorizationPage;
