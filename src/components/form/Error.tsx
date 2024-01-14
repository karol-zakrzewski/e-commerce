import React from "react";

type ErrorProps = {
  errors: Record<string, { message?: string }>;
};

export const Error = ({ errors }: ErrorProps) => {
  const [error] = Object.values(errors);
  if (!error || !error.message) {
    return;
  }
  return (
    <div className="rounded-md bg-red-200 p-4 text-red-800">
      {error.message}
    </div>
  );
};
