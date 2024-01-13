"use client";
import { Button } from "@/components/form/Button";
import { FormHeader } from "@/components/form/FormHeader";
import { Input } from "@/components/form/Input";
import { Error } from "@/components/form/Error";
import { signUpFormSchema } from "@/components/signUp/conts";
import { SignUpData } from "@/components/signUp/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit = (data: SignUpData) => {
    console.log("🚀  data:", data);
    signUpFormSchema.safeParse(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-lg flex-col gap-4 rounded-md bg-white/30 p-6 backdrop-blur-sm"
    >
      <FormHeader>Sign up</FormHeader>
      <Error errors={errors} />
      <Input {...register("email")} label="Email" type="text" />
      <Input {...register("password")} label="Password" type="password" />
      <Input
        {...register("confirmPassword")}
        label="Confirm password"
        type="password"
      />

      <Button type="submit">Sign up</Button>
    </form>
  );
};
