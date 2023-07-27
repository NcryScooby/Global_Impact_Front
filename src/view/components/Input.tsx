import { ComponentProps, forwardRef } from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  error?: string;
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
            "bg-white rounded-lg border border-gray-300 bg px-3 h-[52px] text-gray-800 w-full pt-4 peer placeholder-shown:pt-0 text-sm focus:border-gray-700 transition-all outline-none",
            error && "!border-[#C92A2A]",
            className
          )}
          placeholder=" "
        />
        <label
          htmlFor={inputId}
          className="absolute text-[10px] left-[13px] top-2 pointer-events-none text-gray-500 peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 transition-all"
        >
          {placeholder}
        </label>

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

Input.displayName = "Input";
