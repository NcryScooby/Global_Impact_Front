import { ChangeEvent, ComponentProps, forwardRef, useState } from 'react';
import { CaretDownIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { cn } from '../../../app/utils/functions/cn';

interface SelectProps extends ComponentProps<'select'> {
  name: string;
  error?: string;
  label: string;
  options: {
    id: string;
    name: string;
  }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      name,
      label,
      placeholder,
      error,
      options,
      className,
      ...props
    }: SelectProps,
    ref
  ) => {
    const selectId = id ?? name;

    const [selectedOption, setSelectedOption] = useState('');

    const handleChangeSelectedOption = (
      event: ChangeEvent<HTMLSelectElement>
    ) => {
      setSelectedOption(event.target.value);
    };

    return (
      <div className="relative">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-primary"
        >
          {label}
        </label>

        <select
          ref={ref}
          name={name}
          id={selectId}
          {...props}
          value={selectedOption}
          onChange={handleChangeSelectedOption}
          className={cn(
            'bg-white border border-gray-300 text-gray-900 text-sm rounded-[4px] block w-full p-2.5 focus:border-gray-700 transition-all outline-none appearance-none',
            error && '!border-[#C92A2A]',
            className
          )}
        >
          <option value="" disabled>
            Select your {placeholder}
          </option>
          {options?.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute top-[39px] right-0 flex items-center px-4 text-gray-400 ">
          <CaretDownIcon width={20} height={20} />
        </div>

        {error && (
          <div className="flex gap-1 items-center mt-2 text-[#C92A2A]">
            <CrossCircledIcon />
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
