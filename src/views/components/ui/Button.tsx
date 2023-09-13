import { Spinner } from '@components/ui/Spinner';
import { ComponentProps } from 'react';
import { cn } from '@utils/helpers/cn';

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
        'bg-primary text-secondary px-6 h-[42px] rounded-[2px] text-sm disabled:cursor-not-allowed transition-all active:bg-black flex items-center justify-center cursor-pointer',
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
