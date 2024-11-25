import { z } from "zod";

const signInFormSchema = z.object({
  email: z.string().min(1, "Email is required."),
  password: z.string().min(8, "Minimum of 8 characters required."),
});

export { signInFormSchema };
