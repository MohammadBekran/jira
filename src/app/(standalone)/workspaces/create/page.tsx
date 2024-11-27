import CreateWorkspaceForm from "@/features/workspaces/components/create-workspace-form";

import { protectRoute } from "@/core/actions";

const CreateWorkspacePage = async () => {
  await protectRoute("/sign-in");

  return (
    <div className="w-full lg:max-w-xl">
      <CreateWorkspaceForm />
    </div>
  );
};

export default CreateWorkspacePage;
