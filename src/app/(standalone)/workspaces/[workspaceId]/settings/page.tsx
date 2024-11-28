import { redirect } from "next/navigation";

import UpdateWorkspaceForm from "@/features/workspaces/components/update-workspace-form";
import { getWorkspace } from "@/features/workspaces/core/actions";

import { protectRoute } from "@/core/actions";

const WorkspaceSettingsPage = async ({
  params,
}: {
  params: { workspaceId: string };
}) => {
  await protectRoute("/sign-in", false);

  const workspace = await getWorkspace({ workspaceId: params.workspaceId });

  if (!workspace) redirect(`/workspaces/${params.workspaceId}`);

  return (
    <div className="w-full lg:max-w-xl">
      <UpdateWorkspaceForm initialValues={workspace} />
    </div>
  );
};

export default WorkspaceSettingsPage;
