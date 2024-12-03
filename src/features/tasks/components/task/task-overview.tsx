import { PencilIcon } from "lucide-react";

import MemberAvatar from "@/features/members/components/member-avatar";
import TaskDate from "@/features/tasks/components/task-date";
import OverviewProperty from "@/features/tasks/components/task/overview-property";
import { useUpdateTaskModal } from "@/features/tasks/core/hooks";
import type { TTask } from "@/features/tasks/core/types";

import DottedSeparator from "@/components/dotted-separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { snakeCaseToTitleCase } from "@/lib/utils";

const TaskOverview = ({ data }: { data: TTask }) => {
  const { open } = useUpdateTaskModal();

  const name = snakeCaseToTitleCase(data.status);
  const assigneeName = data.assignee.data.name;

  return (
    <div className="space-y-4 col-span-1">
      <div className="rounded-lg p-4 bg-muted">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">Overview</p>
          <Button size="sm" variant="secondary" onClick={() => open(data.$id)}>
            <PencilIcon className="size-4" />
            Edit
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <div className="space-y-4">
          <OverviewProperty label="Assignee">
            <MemberAvatar name={assigneeName} className="size-6" />
            <p className="text-sm font-medium">{assigneeName}</p>
          </OverviewProperty>
          <OverviewProperty label="Due Date">
            <TaskDate value={data.dueDate} className="text-sm font-medium" />
          </OverviewProperty>
          <OverviewProperty label="Status">
            <Badge variant={data.status}>{name}</Badge>
          </OverviewProperty>
        </div>
      </div>
    </div>
  );
};

export default TaskOverview;
