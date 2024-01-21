import React, { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-800 text-white">
      <div className="relative z-10 w-1/2">{children}</div>
    </div>
  );
};

export default AuthLayout;
