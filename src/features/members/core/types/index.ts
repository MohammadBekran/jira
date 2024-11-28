import { Models } from "node-appwrite";

export type TMember = Models.Document & {
  workspaceId: string;
  userId: string;
  role: string;
};
