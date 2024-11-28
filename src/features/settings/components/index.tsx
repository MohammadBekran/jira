import UpdateWorkspaceForm from "@/features/workspaces/components/update-workspace-form";
import type { TWorkspace } from "@/features/workspaces/core/types";

const WorkspaceSettings = ({ workspace }: { workspace: TWorkspace }) => {
  return (
    <div className="w-full lg:max-w-xl">
      <UpdateWorkspaceForm initialValues={workspace} />
    </div>
  );
};

export default WorkspaceSettings;
