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
      className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-tl from-orange-300 to-orange-600 px-6 py-2 text-white"
    >
      {icon} {children}
    </button>
  );
};
