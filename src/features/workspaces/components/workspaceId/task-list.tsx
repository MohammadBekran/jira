import { formatDistanceToNow } from "date-fns";
import { Calendar, PlusIcon } from "lucide-react";
import Link from "next/link";

import { useCreateTaskModal } from "@/features/tasks/core/hooks";
import type { TTask } from "@/features/tasks/core/types";
import { useWorkspaceId } from "@/features/workspaces/core/hooks";

import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ITaskListProps {
  data: TTask[];
  total: number;
}

const TaskList = ({ data, total }: ITaskListProps) => {
  const workspaceId = useWorkspaceId();
  const { setStatus } = useCreateTaskModal();

  const renderTaskDueDate = (task: TTask) => {
    return formatDistanceToNow(new Date(task.dueDate));
  };

  return (
    <div className="rounded-lg space-y-4 col-span-1 p-4 bg-muted">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Tasks ({total})</span>
        <Button size="icon" variant="muted" onClick={() => setStatus("true")}>
          <PlusIcon className="size-4 text-neutral-400" />
        </Button>
      </div>
      <DottedSeparator className="my-4" />
      <ul className="space-y-4">
        {data.map((task) => {
          const { $id, name, project } = task;

          return (
            <li key={$id}>
              <Link href={`/workspaces/${workspaceId}/tasks/${$id}`}>
                <Card className="rounded-lg transition shadow-none hover:opacity-75">
                  <CardContent className="p-4">
                    <p className="text-lg font-medium truncate">{name}</p>
                    <div className="flex items-center gap-x-2">
                      <span>{project?.name}</span>
                      <div className="size-1 rounded-full bg-neutral-300" />
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="size-3 mr-1" />
                        <span className="truncate">
                          {renderTaskDueDate(task)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          );
        })}
        <li className="hidden first-of-type:block text-sm text-center text-muted-foreground">
          No tasks found
        </li>
      </ul>
      <Button variant="muted" className="w-full mt-4" asChild>
        <Link href={`/workspaces/${workspaceId}/tasks`}>Show All</Link>
      </Button>
    </div>
  );
};

export default TaskList;
