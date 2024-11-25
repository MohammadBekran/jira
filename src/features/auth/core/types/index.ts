import { z } from "zod";

import { signInFormSchema } from "@/features/auth/core/validations";

type TSignInFormData = z.infer<typeof signInFormSchema>;

export type { TSignInFormData };
