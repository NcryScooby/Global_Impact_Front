import { cn } from '../../../app/utils/functions/cn';
import { ComponentProps } from 'react';
import { Spinner } from '../ui/Spinner';

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
        'bg-primary text-secondary px-6 h-[48px] rounded-[2px] font-normal disabled:cursor-not-allowed transition-all active:bg-black flex items-center justify-center',
        className
      )}
    >
      {!isloading && children}
      {isloading && <Spinner className="text-primary fill-gray-300" />}
    </button>
  );
};
