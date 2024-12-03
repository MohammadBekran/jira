import type { Metadata } from "next";
import { redirect } from "next/navigation";

import WorkspaceJoin from "@/features/workspaces/components/workspaceId/join";
import { getWorkspaceInfo } from "@/features/workspaces/core/queries";

import { protectRoute } from "@/core/actions";

interface IWorkspaceJoinPageProps {
  params: Promise<{ workspaceId: string }>;
}

const WorkspaceJoinPage = async ({ params }: IWorkspaceJoinPageProps) => {
  await protectRoute("/sign-in", false);

  const { workspaceId } = await params;

  const workspace = await getWorkspaceInfo({ workspaceId });

  if (!workspace) redirect("/");

  return <WorkspaceJoin workspace={workspace} />;
};

export const generateMetadata = async ({
  params,
}: IWorkspaceJoinPageProps): Promise<Metadata> => {
  const { workspaceId } = await params;

  const workspace = await getWorkspaceInfo({ workspaceId });

  return {
    title: `Invite to "${workspace.name}"`,
    description: `Invite to "${workspace.name}" workspace`,
  };
};

export default WorkspaceJoinPage;
