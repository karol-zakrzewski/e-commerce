import { signUpFormSchema } from "@/components/signUp/conts";
import { z } from "zod";

export type User = z.infer<typeof signUpFormSchema>;
