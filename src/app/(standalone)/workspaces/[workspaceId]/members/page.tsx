import type { Metadata } from "next";

import WorkspaceMembers from "@/features/workspaces/components/workspaceId/members";

import { protectRoute } from "@/core/actions";

const WorkspaceMemberPage = async () => {
  await protectRoute("/sign-in", false);

  return <WorkspaceMembers />;
};

export const metadata: Metadata = {
  title: "members",
  description: "all of workspace members",
};

export default WorkspaceMemberPage;
