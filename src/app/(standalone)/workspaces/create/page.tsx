import type { Metadata } from "next";

import CreateWorkspaceForm from "@/features/workspaces/components/create-workspace-form";

import { protectRoute } from "@/core/actions";

const CreateWorkspacePage = async () => {
  await protectRoute("/sign-in", false);

  return (
    <div className="w-full lg:max-w-xl">
      <CreateWorkspaceForm />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Create workspace",
  description: "Create a new workspace",
};

export default CreateWorkspacePage;
