import { User } from "@/components/signUp/types";
import { z } from "zod";

export const signUpFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(1),
    confirmPassword: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phoneNumber: z.number(),
    address: z.string().min(1),
  })
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
