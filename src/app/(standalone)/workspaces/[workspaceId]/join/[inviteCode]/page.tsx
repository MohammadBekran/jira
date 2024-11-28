import { redirect } from "next/navigation";

import WorkspaceJoin from "@/features/workspaces/components/workspaceId/join";
import { getWorkspaceInfo } from "@/features/workspaces/core/queries";

import { protectRoute } from "@/core/actions";

const WorkspaceJoinPage = async ({
  params,
}: {
  params: { workspaceId: string };
}) => {
  await protectRoute("/sign-in", false);

  const workspace = await getWorkspaceInfo({ workspaceId: params.workspaceId });

  if (!workspace) redirect("/");

  return <WorkspaceJoin workspace={workspace} />;
};

export default WorkspaceJoinPage;
