'use client';
import SimpleInput from '@/components/simpleInput';
import SimpleTextarea from '@/components/simpleTextarea';
import React from 'react';

const GeneralPage = () => {
  const renderLabel = (label: string) => {
    return <label className="block w-[10rem]">{label}</label>;
  };
  return (
    <div className="m-auto w-[42rem] h-full p-5 flex flex-col gap-2">
      <div className="flex gap-2">
        {renderLabel('Workspace Name')}
        <div className="grow">
          <SimpleInput name={'name'} type={'text'} defaultValue={undefined} />
        </div>
      </div>
      <div className="flex gap-2">
        {renderLabel('Workspace ID')}
        <div className="grow">
          <SimpleInput name={'id'} type={'text'} defaultValue={undefined} />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="grow-0">{renderLabel('Description')}</div>
        <div className="grow">
          <SimpleTextarea name={'id'} defaultValue={undefined} />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="grow-0">{renderLabel('Duration')}</div>
        <div className="flex grow gap-1">
          <SimpleInput name={'startDate'} type={'date'} defaultValue={undefined} />
          <div>~</div>
          <SimpleInput name={'endDate'} type={'date'} defaultValue={undefined} />
        </div>
      </div>
    </div>
  );
};
export default GeneralPage;
