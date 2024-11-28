"use client";

import JoinWorkspaceForm from "@/features/workspaces/components/workspaceId/join/join-workspace-form";

interface IWorkspaceJoinProps {
  workspace: { name: string };
}

const WorkspaceJoin = ({ workspace }: IWorkspaceJoinProps) => {
  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialValues={workspace} />
    </div>
  );
};

export default WorkspaceJoin;
