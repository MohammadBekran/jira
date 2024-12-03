"use client";

import { PencilIcon } from "lucide-react";
import Link from "next/link";

import ProjectAvatar from "@/features/projects/components/project-avatar";
import { useGetProjectAnalytics } from "@/features/projects/core/services/api/queries.api";
import type { TProject } from "@/features/projects/core/types";
import TasksViewSwitcher from "@/features/tasks/components/tasks-view-switcher";

import Analytics from "@/components/analytics";
import PageLoader from "@/components/page-loader";
import { Button } from "@/components/ui/button";

const Project = ({ project }: { project: TProject }) => {
  const { data, isLoading } = useGetProjectAnalytics({
    projectId: project.$id,
  });

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            image={project.imageUrl}
            name={project.name ?? ""}
            className="size-8"
          />
          <p className="text-lg font-semibold">{project.name}</p>
        </div>
        <div>
          <Button size="sm" variant="secondary" asChild>
            <Link
              href={`/workspaces/${project.workspaces}/projects/${project.$id}/settings`}
            >
              <PencilIcon className="size-4 " />
              Edit Project
            </Link>
          </Button>
        </div>
      </div>
      {data && <Analytics data={data} />}
      <TasksViewSwitcher hideProjectFilters />
    </div>
  );
};

export default Project;
