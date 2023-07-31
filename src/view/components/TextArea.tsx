import { CrossCircledIcon } from '@radix-ui/react-icons';
import { ComponentProps, forwardRef } from 'react';
import { cn } from '../../app/utils/cn';

interface TextAreaProps extends ComponentProps<'textarea'> {
  name: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { id, name, placeholder, error, className, ...props }: TextAreaProps,
    ref
  ) => {
    const textAreaId = id ?? name;

    return (
      <div className="relative">
        <textarea
          ref={ref}
          name={name}
          id={textAreaId}
          {...props}
          className={cn(
            'bg-white rounded-[4px] border border-gray-300 bg px-3 h-32 text-gray-800 w-full pt-4 text-sm focus:border-gray-700 transition-all outline-none resize-none',
            error && '!border-[#C92A2A]',
            className
          )}
          placeholder={placeholder}
        />

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

TextArea.displayName = 'textarea';
