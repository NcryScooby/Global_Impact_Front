import { CrossCircledIcon } from '@radix-ui/react-icons';
import { ComponentProps, forwardRef } from 'react';
import { cn } from '../../../app/utils/helpers/cn';

interface TextAreaProps extends ComponentProps<'textarea'> {
  name: string;
  error?: string;
  label?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ id, name, label, error, className, ...props }: TextAreaProps, ref) => {
    const textAreaId = id ?? name;

    return (
      <div className="relative">
        {label ? (
          <label htmlFor={textAreaId} className="block mb-2 text-[13px] text-gray-500">
            {label}
          </label>
        ) : null}

        <textarea
          ref={ref}
          name={name}
          id={textAreaId}
          {...props}
          className={cn(
            'bg-white border border-gray-300 text-gray-900 h-24 text-sm rounded-[2px] block w-full p-2.5 focus:border-gray-400 transition-all outline-none resize-none mt-4 dark:bg-black-600 dark:text-gray-400 dark:border-black-600 dark:focus:border-black-500',
            error ? '!border-[#C92A2A]' : '',
            className
          )}
        />

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

TextArea.displayName = 'textarea';
