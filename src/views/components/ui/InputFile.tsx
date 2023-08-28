import { ChangeEvent, ComponentProps, forwardRef } from 'react';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { cn } from '../../../app/utils/helpers/cn';
import { UploadIcon } from '@radix-ui/react-icons';

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
        <label htmlFor={inputId} className="block mb-2 text-[13px] text-gray-500">
          {label}
        </label>

        <div
          className={cn(
            'flex items-center justify-center w-full border bg-white border-gray-300 text-gray-900 text-sm rounded-[2px]',
            error ? '!border-[#C92A2A]' : '',
            className
          )}
        >
          <label
            htmlFor={inputId}
            className="flex items-center justify-end h-full w-full cursor-pointer pr-4"
          >
            <div className="flex items-center justify-center h-[40px]">
              {selectedFile ? <span className="absolute left-3">{selectedFile}</span> : null}
              <UploadIcon className="absolute right-3.5 text-gray-400" />
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
