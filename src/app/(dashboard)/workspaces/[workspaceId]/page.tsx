import Workspace from "@/features/workspaces/components/workspaceId";

import { protectRoute } from "@/core/actions";

const WorkSpacePage = async () => {
  await protectRoute("/sign-in", false);

  return <Workspace />;
};

export default WorkSpacePage;
