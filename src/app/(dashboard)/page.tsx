import CreateWorkspaceForm from "@/features/workspaces/components/create-workspace-form";

import { protectRoute } from "@/core/actions";

const HomePage = async () => {
  await protectRoute("/sign-in", false);

  return (
    <div>
      <CreateWorkspaceForm />
    </div>
  );
};

export default HomePage;
