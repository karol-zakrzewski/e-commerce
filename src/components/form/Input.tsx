import { InputHTMLAttributes, LegacyRef, forwardRef } from "react";

type InputProps = { label: string } & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label>{label}</label>
        <input {...props} ref={ref} className="rounded-sm p-2 text-gray-800" />
      </div>
    );
  },
);

Input.displayName = "Input";
