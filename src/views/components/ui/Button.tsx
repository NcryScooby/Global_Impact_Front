import { cn } from '../../../app/utils/helpers/cn';
import { ComponentProps } from 'react';
import { Spinner } from '../ui/Spinner';

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean;
  spinnerStyle?: string;
}

export const Button = ({
  className,
  isLoading,
  disabled,
  children,
  spinnerStyle,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        'bg-primary text-secondary px-6 h-[48px] rounded-[2px] font-normal disabled:cursor-not-allowed transition-all active:bg-black flex items-center justify-center',
        className
      )}
    >
      {!isLoading ? children : null}
      {isLoading ? (
        <Spinner className={cn('text-primary fill-white w-5 h-5', spinnerStyle)} />
      ) : null}
    </button>
  );
};
