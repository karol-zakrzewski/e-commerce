import { PropsWithChildren } from "react";

export const FormHeader = ({ children }: PropsWithChildren) => {
  return (
    <h2 className="text-center text-3xl font-bold uppercase tracking-widest">
      {children}
    </h2>
  );
};
