import { ChevronRightIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ProjectAvatar from "@/features/projects/components/project-avatar";
import type { TProject } from "@/features/projects/core/types";
import { useDeleteTask } from "@/features/tasks/core/services/api/mutations.api";
import type { TTask } from "@/features/tasks/core/types";
import { useWorkspaceId } from "@/features/workspaces/core/hooks";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/core/hooks";

interface ITaskBreadcrumbsProps {
  task: TTask;
  project: TProject;
}

const TaskBreadcrumbs = ({ task, project }: ITaskBreadcrumbsProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useDeleteTask();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete task",
    "This action cannot be undone.",
    "destructive"
  );

  const handleDeleteTask = async () => {
    const ok = await confirm();
    if (!ok) return;

    mutate(
      { param: { taskId: task.$id } },
      {
        onSuccess: () => {
          router.push(`/workspaces/${workspaceId}/tasks`);
        },
      }
    );
  };

  return (
    <div className="flex items-center gap-x-2">
      <ConfirmDialog />
      <ProjectAvatar
        name={project.name}
        image={project.imageUrl}
        className="size-6 lg:size-8"
      />
      <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
        <p className="text-sm font-semibold transition text-muted-foreground hover:opacity-75 lg:text-lg">
          {project.name}
        </p>
      </Link>
      <ChevronRightIcon className="size-4 text-muted-foreground lg:size-5" />
      <p className="text-sm font-semibold lg:text-lg">{task.name}</p>
      <Button
        size="sm"
        variant="destructive"
        disabled={isPending}
        className="ml-auto"
        onClick={handleDeleteTask}
      >
        <TrashIcon className="size-4" />
        <span>Delete Task</span>
      </Button>
    </div>
  );
};

export default TaskBreadcrumbs;
