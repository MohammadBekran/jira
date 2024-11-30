import { Models } from "node-appwrite";
import { z } from "zod";

import { createTaskSchema } from "@/features/tasks/core/validations";

type TTask = Models.Document & {
  name: string;
  imageUrl: string;
  userId: string;
  workspaceId: string;
};
type TCreateTaskFormData = z.infer<typeof createTaskSchema>;

export type { TTask, TCreateTaskFormData };
