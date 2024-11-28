import WorkspaceMembers from "@/features/workspaces/components/workspaceId/members";

import { protectRoute } from "@/core/actions";

const WorkspaceMemberPage = async () => {
  await protectRoute("/sign-in", false);

  return <WorkspaceMembers />;
};

export default WorkspaceMemberPage;
