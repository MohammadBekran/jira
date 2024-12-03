import { InferResponseType } from "hono";
import { Models } from "node-appwrite";
import { z } from "zod";

import {
  createProjectSchema,
  updateProjectSchema,
} from "@/features/projects/core/validations";

import client from "@/lib/rpc";

type TProject = Models.Document & {
  name: string;
  imageUrl: string;
  userId: string;
  workspaceId: string;
};
type TCreateProjectFormData = z.infer<typeof createProjectSchema>;
type TUpdateProjectFormData = z.infer<typeof updateProjectSchema>;
type TProjectAnalyticsResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["analytics"]["$get"],
  200
>;

export type {
  TCreateProjectFormData,
  TProject,
  TProjectAnalyticsResponseType,
  TUpdateProjectFormData,
};
