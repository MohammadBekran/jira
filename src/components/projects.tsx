"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

import ProjectAvatar from "@/features/projects/components/project-avatar";
import { useCreateProjectModal } from "@/features/projects/core/hooks";
import { useGetProjects } from "@/features/projects/core/services/api/queries.api";
import { useWorkspaceId } from "@/features/workspaces/core/hooks";

import { cn } from "@/lib/utils";

const Projects = () => {
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();
  const { open } = useCreateProjectModal();
  const { data } = useGetProjects({ workspaceId });

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill
          className="size-5 cursor-pointer transition text-neutral-500 hover:opacity-75"
          onClick={open}
        />
      </div>
      {data?.documents.map((project) => {
        const href = `/workspaces/${workspaceId}/projects/${project.$id}`;
        const isActive = pathname === href;

        return (
          <Link key={project.$id} href={href}>
            <div
              className={cn(
                "flex items-center rounded-md gap-2.5 p-2.5 transition cursor-pointer font-medium text-neutral-500 hover:opacity-75",
                isActive && "shadow-sm bg-white text-primary hover:opacity-100"
              )}
            >
              <ProjectAvatar image={project.imageUrl} name={project.name} />
              <span className="truncate">{project.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Projects;
