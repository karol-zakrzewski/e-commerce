import { User } from "@/components/auth/types";
import { z } from "zod";

export const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const signUpFormSchema = z
  .object({
    confirmPassword: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phoneNumber: z.number(),
    address: z.string().min(1),
  })
  .and(authFormSchema)
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const userDefaultValues: Partial<User> = {
  address: "",
  confirmPassword: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  phoneNumber: undefined,
};
