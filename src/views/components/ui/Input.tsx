import { ComponentProps, ReactNode, forwardRef } from 'react';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { cn } from '@utils/helpers/cn';

interface InputProps extends ComponentProps<'input'> {
  name: string;
  error?: string;
  label?: string;
  icon?: ReactNode;
  iconStyle?: string;
  prependComponent?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { id, name, label, error, icon, className, iconStyle, prependComponent, ...props }: InputProps,
    ref
  ) => {
    const inputId = id ?? name;

    return (
      <div className="relative">
        <label
          htmlFor={inputId}
          className={`block ${label ? 'mb-2' : null} text-[13px] text-gray-500`}
        >
          {label}
        </label>

        <input
          ref={ref}
          name={name}
          id={inputId}
          {...props}
          className={cn(
            'bg-white border border-gray-300 text-gray-900 dark:bg-black-600 dark:text-gray-400 text-sm rounded-[2px] block w-full p-2.5 focus:border-gray-400 dark:border-black-600 dark:focus:border-black-500 transition-all outline-none file:hidden',
            error ? '!border-[#C92A2A]' : '',
            className
          )}
        />

        {prependComponent ? (
          <div className="relative min-h-[40px]">
            <div className="text-sm mt-1 flex-shrink-0 text-gray-400 flex flex-wrap items-center gap-1">
              {prependComponent}
            </div>
          </div>
        ) : null}

        {icon ? (
          <div
            className={cn(
              'absolute top-[21px] right-0 flex items-center pr-2.5 text-gray-400',
              iconStyle
            )}
          >
            {icon}
          </div>
        ) : null}

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

Input.displayName = 'Input';
