import { CaretDownIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { ChangeEvent, ComponentProps, forwardRef } from 'react';
import { cn } from '@utils/helpers/cn';
import { Spinner } from './Spinner';

interface SelectProps extends ComponentProps<'select'> {
  name: string;
  error?: string;
  label?: string;
  options: {
    id: string;
    name: string;
  }[];
  selectedOption: string;
  handleChangeSelectedOption: (event: ChangeEvent<HTMLSelectElement>) => void;
  isLoading?: boolean;
  isSuccess?: boolean;
  iconStyle?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      name,
      label,
      placeholder,
      error,
      selectedOption,
      handleChangeSelectedOption,
      options,
      isLoading,
      isSuccess,
      className,
      iconStyle,
      ...props
    }: SelectProps,
    ref
  ) => {
    const selectId = id ?? name;

    return (
      <div className="relative">
        <label
          htmlFor={selectId}
          className={`block ${label ? 'mb-2' : null} text-[13px] text-gray-500`}
        >
          {label}
        </label>

        {isLoading ? (
          <Spinner className="absolute top-8 right-2.5 w-4 fill-gray-400 dark:text-gray-600 dark:fill-white" />
        ) : null}

        <select
          ref={ref}
          name={name}
          id={selectId}
          {...props}
          value={selectedOption}
          onChange={handleChangeSelectedOption}
          className={cn(
            'bg-white border border-gray-300 text-sm rounded-[2px] block w-full p-2.5 focus:border-gray-400 transition-all outline-none appearance-none cursor-pointer dark:bg-black-600 dark:text-gray-400 dark:border-black-600 dark:focus:border-black-500',
            options.length === 0 || !selectedOption ? 'text-gray-400' : 'text-primary',
            error ? '!border-[#C92A2A]' : '',
            className
          )}
        >
          <option value="" disabled>
            {!isLoading && isSuccess ? `Select your ${placeholder}` : null}
          </option>
          {options?.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>

        <div
          className={cn(
            'pointer-events-none absolute top-[39px] right-[-5px] flex items-center px-4 text-gray-400',
            iconStyle
          )}
        >
          {!isLoading ? <CaretDownIcon width={20} height={20} /> : null}
        </div>

        {error ? (
          <div className="flex gap-1 items-center mt-2 text-[#C92A2A]">
            <CrossCircledIcon />
            <span className="text-xs">{error}</span>
          </div>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';
