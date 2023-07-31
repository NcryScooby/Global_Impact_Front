import { CrossCircledIcon } from '@radix-ui/react-icons';
import { ComponentProps, forwardRef } from 'react';
import { cn } from '../../app/utils/cn';

interface InputProps extends ComponentProps<'input'> {
  name: string;
  error?: string;
  inputTitle?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, name, placeholder, error, className, ...props }: InputProps, ref) => {
    const inputId = id ?? name;

    return (
      <div className="relative">
        <input
          ref={ref}
          name={name}
          id={inputId}
          {...props}
          className={cn(
            'bg-white rounded-[4px] border border-gray-300 bg px-3 h-[48px] text-gray-400 w-full text-sm focus:border-gray-700 transition-all outline-none file:hidden',
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

Input.displayName = 'Input';
