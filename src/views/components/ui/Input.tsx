import { CrossCircledIcon } from '@radix-ui/react-icons';
import { ComponentProps, forwardRef } from 'react';
import { cn } from '../../../app/utils/functions/cn';

interface InputProps extends ComponentProps<'input'> {
  name: string;
  error?: string;
  label?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      placeholder,
      error,
      icon,
      className,
      ...props
    }: InputProps,
    ref
  ) => {
    const inputId = id ?? name;

    return (
      <div className="relative">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-primary"
        >
          {label}
        </label>

        <input
          ref={ref}
          name={name}
          id={inputId}
          {...props}
          className={cn(
            'bg-white border border-gray-300 text-gray-900 text-sm rounded-[4px] block w-full p-2.5 focus:border-gray-700 transition-all outline-none file:hidden',
            error && '!border-[#C92A2A]',
            className
          )}
          placeholder={placeholder}
        />

        {icon && (
          <div
            className="
            absolute
            top-[21px]
            right-0
            flex
            items-center
            pr-2.5
            pointer-events-none
            text-gray-400
          "
          >
            {icon}
          </div>
        )}

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
