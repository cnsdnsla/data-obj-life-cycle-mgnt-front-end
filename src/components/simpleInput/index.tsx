/* eslint-disable eqeqeq */
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { Input, Typography } from '@material-tailwind/react';
import { ChangeEvent, HTMLInputTypeAttribute, useEffect } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';

export type SimpleInputValidationRule = {
  required?: { value: boolean; message: string };
  min?: { value: string | number; message: string };
  max?: { value: string | number; message: string };
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
};

export type SimpleInputData = {
  isValid: boolean;
  value: any;
};

export type InputProps = {
  name: string;
  type: HTMLInputTypeAttribute;
  validationRule?: SimpleInputValidationRule;
  defaultValue: any;
  className?: string;
  disabled?: boolean;
  onBlur?: (data: SimpleInputData) => void;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
};

const SimpleInput = (props: InputProps) => {
  const {
    register,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const generateValidationRule = () => {
    const validationRule: RegisterOptions = {
      value: props.defaultValue,
    };
    if (props.validationRule?.required && props.validationRule?.required.value === true) {
      validationRule.required = {
        value: true,
        message: props.validationRule.required.message,
      };
    }
    if (props.validationRule?.min && props.validationRule?.min.value != null) {
      validationRule.min = {
        value: props.validationRule?.min.value,
        message: props.validationRule.min.message,
      };
    }
    if (props.validationRule?.max && props.validationRule?.max.value != null) {
      validationRule.max = {
        value: props.validationRule?.max.value,
        message: props.validationRule.max.message,
      };
    }
    if (props.validationRule?.minLength && props.validationRule?.minLength.value != null) {
      validationRule.minLength = {
        value: props.validationRule?.minLength.value,
        message: props.validationRule.minLength.message,
      };
    }
    if (props.validationRule?.maxLength && props.validationRule?.maxLength.value != null) {
      validationRule.maxLength = {
        value: props.validationRule?.maxLength.value,
        message: props.validationRule.maxLength.message,
      };
    }
    if (props.validationRule?.pattern && props.validationRule?.pattern.value != null) {
      validationRule.pattern = {
        value: props.validationRule?.pattern.value,
        message: props.validationRule.pattern.message,
      };
    }
    return register(props.name, validationRule);
  };

  const handleBlur = () => {
    if (props.onBlur) {
      const data: SimpleInputData = {
        isValid: isValid,
        value: getValues(props.name),
      };
      props.onBlur(data);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e);
    }
  };

  useEffect(() => {
    trigger();
  }, []);

  return (
    <>
      <Input
        type={props.type}
        size="md"
        className={`${props.className} !p-0 !pl-2 !border-t-blue-gray-200 focus:!border-t-blue-500`}
        labelProps={{
          className: 'before:content-none after:content-none',
        }}
        containerProps={{
          className: '!h-8',
        }}
        {...generateValidationRule()}
        // {...register(props.name, { value: props.defaultValue, maxLength: { value: 4, message: 'test' } })}
        onBlur={() => {
          handleBlur();
        }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
        }}
      />
      {errors[props.name]?.message != null && (
        <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal w-full ">
          <>
            <InformationCircleIcon className="w-4 h-4 -mt-px" />
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">{errors[props.name]?.message as string}</p>
          </>
        </Typography>
      )}
    </>
  );
};

export default SimpleInput;
