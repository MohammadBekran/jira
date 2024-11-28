import { getMember } from "@/features/members/core/utils";
import type { TProject } from "@/features/projects/core/types";

import { DATABASE_ID, PROJECTS_ID } from "@/core/configs";
import { createSessionClient } from "@/lib/appwrite";

export const getProject = async ({ projectId }: { projectId: string }) => {
  const { databases, account } = await createSessionClient();

  const user = await account.get();

  const project = await databases.getDocument<TProject>(
    DATABASE_ID,
    PROJECTS_ID,
    projectId
  );

  const member = await getMember({
    databases,
    workspaceId: project.workspaceId,
    userId: user.$id,
  });

  if (!member) throw new Error("Unauthorized");

  return project;
};
