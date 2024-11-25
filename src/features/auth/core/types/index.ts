import { z } from "zod";

import {
  signInFormSchema,
  signUpFormSchema,
} from "@/features/auth/core/validations";

type TSignInFormData = z.infer<typeof signInFormSchema>;
type TSignUpFormData = z.infer<typeof signUpFormSchema>;

export type { TSignInFormData, TSignUpFormData };
