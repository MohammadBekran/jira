import { InferResponseType } from "hono";
import { Models } from "node-appwrite";
import { z } from "zod";

import {
  createWorkspaceSchema,
  updateWorkspaceSchema,
} from "@/features/workspaces/core/validations";

import client from "@/lib/rpc";

type TWorkspace = Models.Document & {
  name: string;
  imageUrl: string;
  inviteCode: string;
  userId: string;
};
type TCreateWorkspaceFormData = z.infer<typeof createWorkspaceSchema>;
type TUpdateWorkspaceFormData = z.infer<typeof updateWorkspaceSchema>;
type TWorkspaceAnalyticsResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["analytics"]["$get"],
  200
>;

export type {
  TCreateWorkspaceFormData,
  TUpdateWorkspaceFormData,
  TWorkspace,
  TWorkspaceAnalyticsResponseType,
};
