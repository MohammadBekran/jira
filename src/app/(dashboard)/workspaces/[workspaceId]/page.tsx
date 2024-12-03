import type { Metadata } from "next";

import Workspace from "@/features/workspaces/components/workspaceId";
import { getWorkspace } from "@/features/workspaces/core/queries";

import { protectRoute } from "@/core/actions";

const WorkSpacePage = async () => {
  await protectRoute("/sign-in", false);

  return <Workspace />;
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}): Promise<Metadata> => {
  const { workspaceId } = await params;

  const workspace = await getWorkspace({ workspaceId });

  return {
    title: workspace.name,
    description: `see all of tasks, projects and members of "${workspace.name}" workspace`,
  };
};

export default WorkSpacePage;
