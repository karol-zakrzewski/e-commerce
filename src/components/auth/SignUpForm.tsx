"use client";
import { Button } from "@/components/form/Button";
import { FormHeader } from "@/components/form/FormHeader";
import { Input } from "@/components/form/Input";
import { Error } from "@/components/form/Error";
import { signUpFormSchema, userDefaultValues } from "@/components/auth/conts";
import { User } from "@/components/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUp } from "@/api/auth";

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<User>({
    mode: "onBlur",
    resolver: zodResolver(signUpFormSchema),
    defaultValues: userDefaultValues,
  });

  const onSubmit = async (formData: User) => {
    const result = signUpFormSchema.safeParse(formData);

    if (!result.success) {
      return;
    }

    const { error, success } = await signUp(formData);

    if (!success) {
      // ASK: Czy ustawianie error'a z api w hook form jest ok? czy lepiej przenieść to do state
      setError("root", { message: error, type: "value" });
      return;
    }

    clearErrors();
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-lg flex-col gap-6 rounded-md bg-white/30 p-6 backdrop-blur-sm"
    >
      <FormHeader>Sign up</FormHeader>
      <Error errors={errors} />

      <div className="grid  grid-cols-2 gap-4">
        {/* ASK: Czy polecasz wyciągnąć inputy do obietu i później przemapować? */}
        <Input {...register("email")} label="Email" type="text" />
        <Input
          {...register("phoneNumber", { valueAsNumber: true })}
          label="Phone number"
        />
        <Input {...register("password")} label="Password" type="password" />
        <Input
          {...register("confirmPassword")}
          label="Confirm password"
          type="password"
        />
        <Input {...register("firstName")} label="First name" />
        <Input {...register("lastName")} label="Last name" />
        <Input {...register("address")} label="Address" />
      </div>

      <Button type="submit">Sign up</Button>
    </form>
  );
};
