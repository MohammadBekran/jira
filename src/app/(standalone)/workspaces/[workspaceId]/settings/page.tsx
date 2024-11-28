import { redirect } from "next/navigation";

import WorkspaceSettings from "@/features/settings/components";
import { getWorkspace } from "@/features/workspaces/core/queries";

import { protectRoute } from "@/core/actions";

const WorkspaceSettingsPage = async ({
  params,
}: {
  params: { workspaceId: string };
}) => {
  await protectRoute("/sign-in", false);

  const workspace = await getWorkspace({ workspaceId: params.workspaceId });

  if (!workspace) redirect(`/workspaces/${params.workspaceId}`);

  return <WorkspaceSettings workspace={workspace} />;
};

export default WorkspaceSettingsPage;
