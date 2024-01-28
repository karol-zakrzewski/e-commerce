import React, { PropsWithChildren } from "react";

export const Card = ({ children }: PropsWithChildren) => {
  return <div className="divide-y rounded-lg bg-white px-4">{children}</div>;
};
