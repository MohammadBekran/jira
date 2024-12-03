import { Models } from "node-appwrite";

import { TMemberRole } from "@/features/members/core/enum";

export type TMember = Models.Document & {
  workspaceId: string;
  userId: string;
  role: TMemberRole;
};
