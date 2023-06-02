'use client';
import AutoComplete from '@/components/autoComplete';
import EditableTable, {
  EditableTableColumn,
  EditableTableColumnType,
  EditableTableRowValue,
} from '@/components/editableTable';
import FilterableSelect from '@/components/filterableSelect';
import PaginatedTable from '@/components/paginatedTable';
import TreeView from '@/components/treeView';
import { Checkbox, Typography } from '@material-tailwind/react';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

const AuthorizationPage = () => {
  const columns: EditableTableColumn[] = [
    {
      id: 'id',
      name: 'ID',
      type: 'text',
      validationRule: {
        minLength: { value: 2, message: '길이가 2 이상이어야 합니다.' },
      },
    },
    {
      id: 'name',
      name: 'Name',
      order: 1,
      type: 'text',
      validationRule: {
        required: { value: true, message: '값을 입력해주세요.' },
        minLength: { value: 3, message: '길이가 3 이상이어야 합니다.' },
      },
    },
    {
      id: 'description',
      name: 'Description',
      order: 2,
      type: 'number',
      validationRule: {
        max: { value: 10, message: '최대 10까지만 허용합니다.' },
      },
    },
    {
      id: 'order',
      name: 'Order',
      order: 3,
      type: 'number',
      validationRule: {
        min: { value: 1, message: '최소 1가지만 허용합니다.' },
      },
    },
  ];

  const rowValues: EditableTableRowValue[] = [
    {
      id: 'row1',
      cellValues: [
        {
          columnId: 'order',
          value: 'Order1',
        },
        {
          columnId: 'description',
          value: 'Description1',
        },

        {
          columnId: 'id',
          value: 'Id1',
        },
        {
          columnId: 'name',
          value: 'Name1',
        },
      ],
    },
    {
      id: 'row2',
      cellValues: [
        {
          columnId: 'description',
          value: 'Description2',
        },

        {
          columnId: 'id',
          value: 'Id2',
        },
        {
          columnId: 'name',
          value: 'Name2',
        },
        {
          columnId: 'order',
          value: 'Order2',
        },
      ],
    },
    {
      id: 'row3',
      cellValues: [
        {
          columnId: 'order',
          value: 'Order3',
        },
        {
          columnId: 'id',
          value: 'Id3',
        },
        {
          columnId: 'name',
          value: 'Name3',
        },
        {
          columnId: 'description',
          value: 'Description3',
        },
      ],
    },
    {
      id: 'row4',
      cellValues: [
        {
          columnId: 'order',
          value: 'Order4',
        },
        {
          columnId: 'description',
          value: 'Description4',
        },
        {
          columnId: 'name',
          value: 'Name4',
        },
        {
          columnId: 'id',
          value: 'Id4',
        },
      ],
    },

    {
      id: 'row4',
      cellValues: [
        {
          columnId: 'order',
          value: 'Order4',
        },
        {
          columnId: 'description',
          value: 'Description4',
        },
        {
          columnId: 'name',
          value: 'Name4',
        },
        {
          columnId: 'id',
          value: 'Id4',
        },
      ],
    },

    {
      id: 'row4',
      cellValues: [
        {
          columnId: 'order',
          value: 'Order4',
        },
        {
          columnId: 'description',
          value: 'Description4',
        },
        {
          columnId: 'name',
          value: 'Name4',
        },
        {
          columnId: 'id',
          value: 'Id4',
        },
      ],
    },

    {
      id: 'row4',
      cellValues: [
        {
          columnId: 'order',
          value: 'Order4',
        },
        {
          columnId: 'description',
          value: 'Description4',
        },
        {
          columnId: 'name',
          value: 'Name4',
        },
        {
          columnId: 'id',
          value: 'Id4',
        },
      ],
    },

    {
      id: 'row4',
      cellValues: [
        {
          columnId: 'order',
          value: 'Order4',
        },
        {
          columnId: 'description',
          value: 'Description4',
        },
        {
          columnId: 'name',
          value: 'Name4',
        },
        {
          columnId: 'id',
          value: 'Id4',
        },
      ],
    },

    {
      id: 'row4',
      cellValues: [
        {
          columnId: 'order',
          value: 'Order4',
        },
        {
          columnId: 'description',
          value: 'Description4',
        },
        {
          columnId: 'name',
          value: 'Name4',
        },
        {
          columnId: 'id',
          value: 'Id4',
        },
      ],
    },

    {
      id: 'row4',
      cellValues: [
        {
          columnId: 'order',
          value: 'Order4',
        },
        {
          columnId: 'description',
          value: 'Description4',
        },
        {
          columnId: 'name',
          value: 'Name4',
        },
        {
          columnId: 'id',
          value: 'Id4',
        },
      ],
    },

    {
      id: 'row4',
      cellValues: [
        {
          columnId: 'order',
          value: 'Order4',
        },
        {
          columnId: 'description',
          value: 'Description4',
        },
        {
          columnId: 'name',
          value: 'Name4',
        },
        {
          columnId: 'id',
          value: 'Id4',
        },
      ],
    },

    {
      id: 'row4',
      cellValues: [
        {
          columnId: 'order',
          value: 'Order4',
        },
        {
          columnId: 'description',
          value: 'Description4',
        },
        {
          columnId: 'name',
          value: 'Name4',
        },
        {
          columnId: 'id',
          value: 'Id4',
        },
      ],
    },

    {
      id: 'row4',
      cellValues: [
        {
          columnId: 'order',
          value: 'Order4',
        },
        {
          columnId: 'description',
          value: 'Description4',
        },
        {
          columnId: 'name',
          value: 'Name4',
        },
        {
          columnId: 'id',
          value: 'Id4',
        },
      ],
    },

    {
      id: 'row4',
      cellValues: [
        {
          columnId: 'order',
          value: 'Order4',
        },
        {
          columnId: 'description',
          value: 'Description4',
        },
        {
          columnId: 'name',
          value: 'Name4',
        },
        {
          columnId: 'id',
          value: 'Id4',
        },
      ],
    },

    {
      id: 'row4',
      cellValues: [
        {
          columnId: 'order',
          value: 'Order4',
        },
        {
          columnId: 'description',
          value: 'Description4',
        },
        {
          columnId: 'name',
          value: 'Name4',
        },
        {
          columnId: 'id',
          value: 'Id4',
        },
      ],
    },

    {
      id: 'row4',
      cellValues: [
        {
          columnId: 'order',
          value: 'Order4',
        },
        {
          columnId: 'description',
          value: 'Description4',
        },
        {
          columnId: 'name',
          value: 'Name4',
        },
        {
          columnId: 'id',
          value: 'Id4',
        },
      ],
    },

    {
      id: 'row4',
      cellValues: [
        {
          columnId: 'order',
          value: 'Order4',
        },
        {
          columnId: 'description',
          value: 'Description4',
        },
        {
          columnId: 'name',
          value: 'Name4',
        },
        {
          columnId: 'id',
          value: 'Id4',
        },
      ],
    },
  ];

  return (
    <div className="w-full h-full overflow-auto">
      <FilterableSelect
        id="filterableSelect"
        name="filterableSelect"
        multiple={true}
        // selected={['key1', 'key2', 'key7', 'key8']}
        options={[
          { key: 'key1', label: 'Label1' },
          { key: 'key2', label: 'Label2' },
          { key: 'key3', label: 'Label3' },
          { key: 'key4', label: 'Label4' },
          { key: 'key5', label: 'Label5' },
          { key: 'key6', label: 'Label6' },
          { key: 'key7', label: 'Label7' },
          { key: 'key8', label: 'Label8' },
          { key: 'key9', label: 'Label9' },
          { key: 'key10', label: 'Label10' },
        ]}
      />
      <TreeView
        tree={[
          {
            key: '1',
            label: (
              <div className="flex items-center">
                <Checkbox
                  checked
                  onChange={(e) => {
                    console.log(e.target.checked);
                  }}
                  containerProps={{ className: 'p-0 px-1' }}
                  label={
                    <Typography color="blue-gray" className="mr-auto font-normal">
                      Open
                    </Typography>
                  }
                />
              </div>
            ),
          },
          {
            key: '2',
            label: 'In Progress',
            open: true,
            subTreeData: [
              { key: '2-1', label: 'Requirement Analysis' },
              {
                key: '2-2',
                label: 'Design',
                open: true,
                subTreeData: [
                  {
                    key: '2-2-1',
                    label: 'Primarily design',
                  },
                  {
                    key: '2-2-2',
                    label: 'Detailed design',
                    open: true,
                    subTreeData: [
                      {
                        key: '2-2-2-1',
                        label: 'Component Design',
                      },
                      {
                        key: '2-2-2-2',
                        label: 'Class Design',
                      },
                      {
                        key: '2-2-2-3',
                        label: 'Function Design',
                      },
                    ],
                  },
                ],
              },
              { key: '2-3', label: 'Implementation' },
              { key: '2-4', label: 'Test' },
            ],
          },
          {
            key: '3',
            label: 'Done',
          },
          {
            key: '4',
            label: 'Reviewing',
          },
          {
            key: '5',
            label: 'Done Done',
          },
        ]}
      />
      <PaginatedTable columns={columns} rowValues={rowValues} />
    </div>
  );
};
export default AuthorizationPage;
