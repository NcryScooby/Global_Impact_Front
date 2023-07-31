import { cn } from '../../app/utils/cn';
import { ComponentProps } from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends ComponentProps<'button'> {
  isloading?: boolean;
}

export const Button = ({
  className,
  isloading,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled || isloading}
      className={cn(
        'bg-primary disabled:bg-gray-100 text-secondary px-6 h-[48px] rounded-[4px] font-normal disabled:cursor-not-allowed disabled:text-gray-400 transition-all hover:bg-[#333333] active:bg-black flex items-center justify-center',
        className
      )}
    >
      {!isloading && children}
      {isloading && <Spinner />}
    </button>
  );
};
