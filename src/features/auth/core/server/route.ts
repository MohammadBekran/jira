import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import {
  signInFormSchema,
  signUpFormSchema,
} from "@/features/auth/core/validations";

const app = new Hono()
  .post("/login", zValidator("json", signInFormSchema), (c) => {
    const { email, password } = c.req.valid("json");

    return c.json({ email, password });
  })
  .post("/register", zValidator("json", signUpFormSchema), (c) => {
    const { name, email, password } = c.req.valid("json");

    return c.json({ name, email, password });
  });

export default app;
