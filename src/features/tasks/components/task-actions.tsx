import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useUpdateTaskModal } from "@/features/tasks/core/hooks";
import { useDeleteTask } from "@/features/tasks/core/services/api/mutations.api";
import { useWorkspaceId } from "@/features/workspaces/core/hooks";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/core/hooks";

interface ITaskActionsProps {
  id: string;
  projectId: string;
  children: React.ReactNode;
}

const TaskActions = ({ id, projectId, children }: ITaskActionsProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { open } = useUpdateTaskModal();
  const { mutate } = useDeleteTask();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete task",
    "This action cannot be undone.",
    "destructive"
  );

  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) return;

    mutate({ param: { taskId: id } });
  };

  const onOpenTask = () => {
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };

  const onOpenProject = () => {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
  };

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem className="font-medium p-[10px]">
            <ExternalLinkIcon
              className="size-4 stroke-2 mr-2"
              onClick={onOpenTask}
            />
            Task Details
          </DropdownMenuItem>
          <DropdownMenuItem
            className="font-medium p-[10px]"
            onClick={onOpenProject}
          >
            <ExternalLinkIcon className="size-4 stroke-2 mr-2" />
            Open Project
          </DropdownMenuItem>
          <DropdownMenuItem
            className="font-medium p-[10px]"
            onClick={() => open(id)}
          >
            <PencilIcon className="size-4 stroke-2 mr-2" />
            Edit Task
          </DropdownMenuItem>
          <DropdownMenuItem
            className="font-medium p-[10px] text-amber-700 focus:tet-amber-700"
            onClick={onDelete}
          >
            <TrashIcon className="size-4 stroke-2 mr-2" />
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TaskActions;
