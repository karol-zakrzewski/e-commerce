import { signUpFormSchema } from "@/components/signUp/conts";
import { z } from "zod";

export type SignUpData = z.infer<typeof signUpFormSchema>;
