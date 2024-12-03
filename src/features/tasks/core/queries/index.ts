import { getMember } from "@/features/members/core/utils";
import type { TTask } from "@/features/tasks/core/types";

import { DATABASE_ID, TASKS_ID } from "@/core/configs";
import { createSessionClient } from "@/lib/appwrite";

export const getTask = async ({ taskId }: { taskId: string }) => {
  const { databases, account } = await createSessionClient();

  const user = await account.get();

  const task = await databases.getDocument<TTask>(
    DATABASE_ID,
    TASKS_ID,
    taskId
  );

  const member = await getMember({
    databases,
    workspaceId: task.workspaceId,
    userId: user.$id,
  });
  if (!member) throw new Error("Unauthorized");

  return task;
};
