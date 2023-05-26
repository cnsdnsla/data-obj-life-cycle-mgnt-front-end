'use client';
import EditableTable, {
  EditableTableColumn,
  EditableTableColumnType,
  EditableTableRowValue,
} from '@/components/editableTable';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

const GeneralPage = () => {
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
  ];

  return (
    <div>
      <EditableTable columns={columns} rowValues={rowValues} />
    </div>
  );
};
export default GeneralPage;
