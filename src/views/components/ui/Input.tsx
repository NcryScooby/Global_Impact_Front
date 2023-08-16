import { CrossCircledIcon } from '@radix-ui/react-icons';
import { cn } from '../../../app/utils/functions/cn';
import { ComponentProps, forwardRef } from 'react';

interface InputProps extends ComponentProps<'input'> {
  name: string;
  error?: string;
  label?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, name, label, error, icon, className, ...props }: InputProps, ref) => {
    const inputId = id ?? name;

    return (
      <div className="relative">
        <label
          htmlFor="first_name"
          className="block mb-2 text-[13px] text-gray-500"
        >
          {label}
        </label>

        <input
          ref={ref}
          name={name}
          id={inputId}
          {...props}
          className={cn(
            'bg-white border border-gray-300 text-gray-900 text-sm rounded-[2px] block w-full p-2.5 focus:border-gray-400 transition-all outline-none file:hidden',
            error ? '!border-[#C92A2A]' : '',
            className
          )}
        />

        {icon ? (
          <div
            className="
            absolute
            top-[13px]
            lg:top-[21px]
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
