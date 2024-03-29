"use client";
import { FormHeader } from "@/components/form/FormHeader";
import { Button } from "@/components/form/Button";
import { Input } from "@/components/form/Input";
import { Error } from "@/components/form/Error";
import { authFormSchema, userDefaultValues } from "@/components/auth/conts";
import { User } from "@/components/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useHandleQueryError } from "@/components/auth/hooks/useHandleQueryError";

export const SignInForm = () => {
  const { signIn: signInError } = useHandleQueryError();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<Pick<User, "email" | "password">>({
    mode: "onBlur",
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: userDefaultValues.email,
      password: userDefaultValues.password,
    },
  });

  const onSubmit = async (formData: Pick<User, "email" | "password">) => {
    const { email, password } = formData;

    await signIn("credentials", {
      email,
      password,
    });

    clearErrors();
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-lg flex-col gap-6 rounded-md bg-white/30 p-6 backdrop-blur-sm"
    >
      <FormHeader>Sign in</FormHeader>
      <Error errors={{ ...errors, signInError }} />

      <div className="grid  grid-cols-1 gap-4">
        <Input {...register("email")} label="Email" type="text" />
        <Input {...register("password")} label="Password" type="password" />
      </div>

      <Button type="submit">Sign in</Button>
    </form>
  );
};
