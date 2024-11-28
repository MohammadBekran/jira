import { Models } from "node-appwrite";
import { z } from "zod";

import {
  createWorkspaceSchema,
  updateWorkspaceSchema,
} from "@/features/workspaces/core/validations";

type TWorkspace = Models.Document & {
  name: string;
  imageUrl: string;
  inviteCode: string;
  userId: string;
};
type TCreateWorkspaceFormData = z.infer<typeof createWorkspaceSchema>;
type TUpdateWorkspaceFormData = z.infer<typeof updateWorkspaceSchema>;

export type { TWorkspace, TCreateWorkspaceFormData, TUpdateWorkspaceFormData };
