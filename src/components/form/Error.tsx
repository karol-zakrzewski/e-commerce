import { User } from "@/components/signUp/types";
import React from "react";
import { FieldErrors } from "react-hook-form";

type ErrorProps = {
  errors: FieldErrors<User>;
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
