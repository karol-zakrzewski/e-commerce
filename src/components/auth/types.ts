import { signUpFormSchema } from "@/components/auth/conts";
import { z } from "zod";

export type User = z.infer<typeof signUpFormSchema>;
