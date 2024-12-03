import type { Metadata } from "next";

import Task from "@/features/tasks/components/task";
import { getTask } from "@/features/tasks/core/queries";

import { protectRoute } from "@/core/actions";

const TaskPage = async () => {
  await protectRoute("/sign-in", false);

  return <Task />;
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ taskId: string }>;
}): Promise<Metadata> => {
  const { taskId } = await params;

  const task = await getTask({ taskId });

  return {
    title: task.name,
    description: task.description ?? `details of "${task.name}" task`,
  };
};

export default TaskPage;
