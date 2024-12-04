import { PlusIcon } from "lucide-react";
import Link from "next/link";

import ProjectAvatar from "@/features/projects/components/project-avatar";
import { useCreateProjectModal } from "@/features/projects/core/hooks";
import type { TProject } from "@/features/projects/core/types";
import { useWorkspaceId } from "@/features/workspaces/core/hooks";

import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface IProjectListProps {
  data: TProject[];
  total: number;
}

const ProjectList = ({ data, total }: IProjectListProps) => {
  const workspaceId = useWorkspaceId();
  const { open: createProject } = useCreateProjectModal();

  return (
    <div className="h-fit rounded-lg space-y-4 col-span-1 p-4 border bg-white">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Projects ({total})</span>
        <Button size="icon" variant="secondary" onClick={createProject}>
          <PlusIcon className="size-4 text-neutral-400" />
        </Button>
      </div>
      <DottedSeparator className="my-4" />
      <ul className="space-y-4">
        {data.map((project) => {
          const { $id, name, imageUrl } = project;

          return (
            <li key={$id}>
              <Link href={`/workspaces/${workspaceId}/projects/${$id}`}>
                <Card className="rounded-lg transition shadow-none hover:opacity-75">
                  <CardContent className="flex items-center gap-x-2.5 p-4">
                    <ProjectAvatar
                      name={name}
                      image={imageUrl}
                      className="size-12"
                      fallbackClassName="text-lg"
                    />
                    <span className="text-lg font-medium truncate">{name}</span>
                  </CardContent>
                </Card>
              </Link>
            </li>
          );
        })}
        <li className="hidden first-of-type:block text-sm text-center text-muted-foreground">
          No projects found
        </li>
      </ul>
    </div>
  );
};

export default ProjectList;
