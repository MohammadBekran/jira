"use client";

import { useGetMembers } from "@/features/members/core/services/api/queries.api";
import { useGetProjects } from "@/features/projects/core/services/api/queries.api";
import { useGetTasks } from "@/features/tasks/core/services/api/queries.api";
import MemberList from "@/features/workspaces/components/workspaceId/member-list";
import ProjectList from "@/features/workspaces/components/workspaceId/project-list";
import TaskList from "@/features/workspaces/components/workspaceId/task-list";
import { useWorkspaceId } from "@/features/workspaces/core/hooks";
import { useGetWorkspaceAnalytics } from "@/features/workspaces/core/services/api/queries.api";

import Analytics from "@/components/analytics";
import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";

const Workspace = () => {
  const workspaceId = useWorkspaceId();
  const { data: analytics, isLoading: isAnalyticsLoading } =
    useGetWorkspaceAnalytics({ workspaceId });
  const { data: projects, isLoading: isProjectsLoading } = useGetProjects({
    workspaceId,
  });
  const { data: tasks, isLoading: isTasksLoading } = useGetTasks({
    workspaceId,
  });
  const { data: members, isLoading: isMembersLoading } = useGetMembers({
    workspaceId,
  });

  const isLoading =
    isAnalyticsLoading ||
    isProjectsLoading ||
    isTasksLoading ||
    isMembersLoading;

  if (isLoading) return <PageLoader />;

  if (!analytics || !projects || !tasks || !members) {
    return <PageError message="Failed to load workspace data" />;
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      <Analytics data={analytics} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TaskList data={tasks.documents} total={tasks.total} />
        <ProjectList data={projects.documents} total={projects.total} />
        <MemberList data={members.documents} total={members.total} />
      </div>
    </div>
  );
};

export default Workspace;
