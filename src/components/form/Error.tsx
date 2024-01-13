import { SignUpData } from "@/components/signUp/types";
import React from "react";
import { FieldErrors } from "react-hook-form";

type ErrorProps = {
  errors: FieldErrors<SignUpData>;
};

export const Error = ({ errors }: ErrorProps) => {
  const [error] = Object.values(errors);
  if (!error) {
    return;
  }
  return (
    <div className="rounded-md bg-red-200 p-4 text-red-800">
      {error.message}
    </div>
  );
};
