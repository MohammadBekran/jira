import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleDotDashedIcon,
  CircleDotIcon,
  CircleIcon,
  PlusIcon,
} from "lucide-react";

import { ETaskStatus } from "@/features/tasks/core/enum";
import { useCreateTaskModal } from "@/features/tasks/core/hooks";

import { Button } from "@/components/ui/button";
import { snakeCaseToTitleCase } from "@/lib/utils";

interface IKanbanColumnHeaderProps {
  board: ETaskStatus;
  taskCount: number;
}

const statusIconMap: Record<ETaskStatus, React.ReactNode> = {
  [ETaskStatus.BACKLOG]: (
    <CircleDashedIcon className="size-[18px] text-pink-400" />
  ),
  [ETaskStatus.TODO]: <CircleIcon className="size-[18px] text-red-400" />,
  [ETaskStatus.IN_PROGRESS]: (
    <CircleDotDashedIcon className="size-[18px] text-yellow-400" />
  ),
  [ETaskStatus.IN_REVIEW]: (
    <CircleDotIcon className="size-[18px] text-blue-400" />
  ),
  [ETaskStatus.DONE]: (
    <CircleCheckIcon className="size-[18px] text-emerald-400" />
  ),
};

const KanbanColumnHeader = ({ board, taskCount }: IKanbanColumnHeaderProps) => {
  const { setStatus } = useCreateTaskModal();

  const icon = statusIconMap[board];

  return (
    <div className="flex justify-between items-center px-2 py-1.5">
      <div className="flex items-center gap-x-2">
        {icon}
        <h2>{snakeCaseToTitleCase(board)}</h2>
        <div className="size-5 flex justify-center items-center rounded-md text-xs font-medium bg-neutral-200 text-neutral-700">
          {taskCount}
        </div>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="size-5"
        onClick={() => setStatus(board)}
      >
        <PlusIcon className="size-4 text-neutral-500" />
      </Button>
    </div>
  );
};

export default KanbanColumnHeader;
