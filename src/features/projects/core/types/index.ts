import { Models } from "node-appwrite";
import { z } from "zod";

import {
  createProjectSchema,
  updateProjectSchema,
} from "@/features/projects/core/validations";

type TProject = Models.Document & {
  name: string;
  imageUrl: string;
  userId: string;
  workspaceId: string;
};
type TCreateProjectFormData = z.infer<typeof createProjectSchema>;
type TUpdateProjectFormData = z.infer<typeof updateProjectSchema>;

export type { TProject, TCreateProjectFormData, TUpdateProjectFormData };
