import type { Metadata } from "next";

import TasksViewSwitcher from "@/features/tasks/components/tasks-view-switcher";

import { protectRoute } from "@/core/actions";
import { getWorkspace } from "@/features/workspaces/core/queries";

const TasksPage = async () => {
  await protectRoute("/sign-in", false);

  return (
    <div className="h-full flex flex-col">
      <TasksViewSwitcher />
    </div>
  );
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}): Promise<Metadata> => {
  const { workspaceId } = await params;

  const workspace = await getWorkspace({ workspaceId });

  return {
    title: "Tasks",
    description: `manage all of your tasks of ${workspace.name} workspace`,
  };
};

export default TasksPage;
