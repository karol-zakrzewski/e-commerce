import { ReactNode, ButtonHTMLAttributes } from "react";

export const Button = ({
  children,
  icon,
  ...props
}: {
  children: ReactNode;
  icon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className="flex items-center justify-center gap-2 rounded-full bg-brand-orange px-6 py-2 text-white"
    >
      {icon} {children}
    </button>
  );
};
