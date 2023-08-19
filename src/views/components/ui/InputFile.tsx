import { ChangeEvent, ComponentProps, forwardRef } from 'react';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { cn } from '../../../app/utils/helpers/cn';

interface InputProps extends ComponentProps<'input'> {
  name: string;
  error?: string;
  label?: string;
  selectedFile: string | null;
  handleSelectedFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputFile = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      error,
      selectedFile,
      handleSelectedFileChange,
      className,
      ...props
    }: InputProps,
    ref
  ) => {
    const inputId = id ?? name;

    return (
      <div className="relative">
        <label
          htmlFor={inputId}
          className="block mb-2 text-[13px] text-gray-500"
        >
          {label}
        </label>

        <div
          className={cn(
            'flex items-center justify-center w-full border border-gray-300 text-gray-900 text-sm rounded-[2px]',
            error ? '!border-[#C92A2A]' : '',
            className
          )}
        >
          <label
            htmlFor={inputId}
            className="flex items-center justify-end h-full w-full cursor-pointer pr-4"
          >
            <div className="flex items-center justify-center h-[40px]">
              {selectedFile ? (
                <span className="absolute left-3">{selectedFile}</span>
              ) : null}
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
            </div>
            <input
              ref={ref}
              name={name}
              type="file"
              id={inputId}
              {...props}
              onChange={(e) => {
                if (props.onChange) props.onChange(e);
                handleSelectedFileChange(e);
              }}
              className={'hidden'}
            />
          </label>
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

InputFile.displayName = 'Input';
