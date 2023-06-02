import { ChevronDownIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Checkbox,
  Chip,
  IconButton,
  List,
  ListItem,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from '@material-tailwind/react';
import Input from '../input';
import { useEffect, useState } from 'react';

export type FilterableSelectOption = {
  key: string;
  label: string;
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

  const [optionMap, setOptionMap] = useState<Map<string, FilterableSelectOption>>(new Map());
  const [selected, setSelected] = useState<string | string[]>(
    props.selected ? props.selected : props.multiple ? [] : ''
  );
  const [open, setOpen] = useState(false);

  const renderMultipleSelectedOptions = () => {
    if (multiple && Array.isArray(selected)) {
      return selected.map((key, index) => {
        if (optionMap.has(key)) {
          return <Chip key={index} value={optionMap.get(key)?.label} />;
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

  const renderOptions = (filterStr?: string) => {
    const targetOptions = [];
    if (filterStr && filterStr.length > 0) {
      optionMap.forEach((option) => {
        if (option.label.includes(filterStr)) {
          targetOptions.push(option);
        }
      });
    } else {
      targetOptions.push(...Array.from(optionMap.values()));
    }
    return targetOptions.map((option, index) => {
      let isSelectedOption = false;
      if (multiple && Array.isArray(selected)) {
        isSelectedOption = selected.includes(option.key);
      } else if (!multiple && typeof selected === 'string') {
        isSelectedOption = option.key === selected;
      }

      return (
        <ListItem
          key={index}
          className={`${isSelectedOption ? 'bg-blue-gray-50' : ''}`}
          onClick={() => {
            handleItemSelected(option.key);
          }}
        >
          {option.label}
        </ListItem>
      );
    });
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

  useEffect(() => {
    const optionMap = new Map<string, FilterableSelectOption>();
    props.options.forEach((option) => {
      optionMap.set(option.key, option);
    });
    setOptionMap(() => optionMap);
  }, []);

  return (
    <div className="w-[200px]">
      <Popover open={open} handler={setOpen}>
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
          <Input type="text" name="dd" defaultValue={''} />
          <List className="p-1">{renderOptions()}</List>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterableSelect;
