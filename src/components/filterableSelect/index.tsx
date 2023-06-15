import { ChevronDownIcon } from '@heroicons/react/24/outline';
import {
  Checkbox,
  Chip,
  Menu,
  MenuItem,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from '@material-tailwind/react';
import Input from '../simpleInput';
import { ChangeEvent, useEffect, useState } from 'react';

export type FilterableSelectOption = {
  key: string;
  value: string;
  label: string | React.ReactElement;
  disabled?: boolean;
};

export type FilterableSelectProps = {
  id: string;
  name: string;
  multiple?: boolean;
  options: FilterableSelectOption[];
  selected?: string | string[];
};

const FilterableSelect = (props: FilterableSelectProps) => {
  const { id, name, multiple } = props;

  const [open, setOpen] = useState(false);
  const [optionMap, setOptionMap] = useState<Map<string, FilterableSelectOption>>(new Map());
  const [filter, setFilter] = useState<string>();
  const [selected, setSelected] = useState<string | string[]>(
    props.selected ? props.selected : props.multiple ? [] : ''
  );

  const renderMultipleSelectedOptions = () => {
    if (multiple && Array.isArray(selected)) {
      return Array.from(optionMap.values()).map((option, index) => {
        if (selected.includes(option.key)) {
          return <Chip key={index} value={optionMap.get(option.key)?.label} />;
        }
      });
    } else {
      throw new Error(`Multiple select must have array selected.`);
    }
  };

  const renderSingleSelectedOption = () => {
    if (!multiple && typeof selected === 'string') {
      if (optionMap.has(selected)) {
        return (
          <Typography color="blue-gray" className="mr-auto font-normal">
            {optionMap.get(selected)?.label}
          </Typography>
        );
      }
    } else {
      throw new Error(`Single select must have string selected.`);
    }
  };

  const renderOptions = () => {
    const targetOptions = [];
    if (filter && filter.length > 0) {
      optionMap.forEach((option) => {
        if (option.value.includes(filter)) {
          targetOptions.push(option);
        }
      });
    } else {
      targetOptions.push(...Array.from(optionMap.values()));
    }

    if (targetOptions.length > 0) {
      return targetOptions.map((option, index) => {
        let isSelectedOption = false;
        if (multiple && Array.isArray(selected)) {
          isSelectedOption = selected.includes(option.key);
        } else if (!multiple && typeof selected === 'string') {
          isSelectedOption = option.key === selected;
        }
        return (
          <MenuItem key={index} className={`p-1`}>
            <label htmlFor={`item-${option.key}`} className="flex cursor-pointer items-center gap-2 p-1">
              <Checkbox
                id={`item-${option.key}`}
                containerProps={{ className: 'p-0' }}
                className="hover:before:content-none"
                onChange={() => {
                  handleItemSelected(option.key);
                }}
                checked={isSelectedOption}
              />
              {option.label}
            </label>
          </MenuItem>
        );
      });
    } else {
      return <MenuItem disabled={true}>No options</MenuItem>;
    }
  };

  const handleItemSelected = (optionKey: string) => {
    if (multiple) {
      setSelected((prev) => {
        const newSelected = [...(prev as string[])];
        const index = newSelected.indexOf(optionKey);
        if (index > -1) {
          newSelected.splice(index, 1);
        } else {
          newSelected.push(optionKey);
        }
        return newSelected;
      });
    } else {
      setSelected(optionKey);
    }
  };

  const handleFilterChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(() => e.target.value);
  };

  useEffect(() => {
    const optionMap = new Map<string, FilterableSelectOption>();
    props.options.forEach((option) => {
      optionMap.set(option.key, option);
    });
    setOptionMap(() => optionMap);
  }, []);

  return (
    <div className="w-[200px]">
      <Popover open={open} handler={setOpen} placement="bottom">
        <PopoverHandler>
          <div
            className={`flex gap-2 items-center w-full p-1 border-2 rounded-[7px] hover:border-blue-500  cursor-pointer ${
              open ? 'border-blue-500' : 'border-blue-gray-200'
            }`}
          >
            <div className="flex flex-wrap gap-2 grow">
              {multiple ? renderMultipleSelectedOptions() : renderSingleSelectedOption()}
            </div>
            <div className="flex grow-0">
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-4 w-4 transition-transform ${open ? '' : 'rotate-180'}`}
              />
            </div>
          </div>
        </PopoverHandler>
        <PopoverContent className="p-2">
          <Input
            type="text"
            id={`filter_${id}`}
            name={`filter_${name}`}
            defaultValue={''}
            onChange={handleFilterChanged}
          />
          <Menu>{renderOptions()}</Menu>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterableSelect;
