import type { Metadata } from "next";
import { redirect } from "next/navigation";

import WorkspaceSettings from "@/features/workspaces/components/workspaceId/settings/components";
import { getWorkspace } from "@/features/workspaces/core/queries";

import { protectRoute } from "@/core/actions";

const WorkspaceSettingsPage = async ({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) => {
  await protectRoute("/sign-in", false);

  const { workspaceId } = await params;

  const workspace = await getWorkspace({ workspaceId });

  if (!workspace) redirect(`/workspaces/${workspaceId}`);

  return <WorkspaceSettings workspace={workspace} />;
};

export const metadata: Metadata = {
  title: "Settings",
  description: "update workspace settings",
};

export default WorkspaceSettingsPage;
