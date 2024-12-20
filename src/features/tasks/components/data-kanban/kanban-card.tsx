import { MoreHorizontal } from "lucide-react";

import MemberAvatar from "@/features/members/components/member-avatar";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import TaskActions from "@/features/tasks/components/task-actions";
import TaskDate from "@/features/tasks/components/task-date";
import type { TTask } from "@/features/tasks/core/types";

import DottedSeparator from "@/components/dotted-separator";

const KanbanCard = ({ task }: { task: TTask }) => {
  return (
    <div className="rounded shadow-sm space-y-3 p-2.5 mb-1.5 bg-white">
      <div className="flex justify-between items-center gap-x-2">
        <p className="text-sm line-clamp-2">{task.name}</p>
        <TaskActions id={task.$id} projectId={task.projectId}>
          <MoreHorizontal className="size-[18px] stroke-1 shrink-0 transition text-neutral-700 hover:opacity-75" />
        </TaskActions>
      </div>
      <DottedSeparator />
      <div className="flex items-center gap-x-1.5">
        <MemberAvatar
          name={task.assignee.name}
          fallbackClassName="text-[10px]"
        />
        <div className="size-1 rounded-full bg-neutral-300" />
        <TaskDate value={task.dueDate} className="text-xs" />
      </div>
      <div className="flex items-center gap-x-1.5">
        <ProjectAvatar
          name={task.project.name}
          image={task.project.imageUrl}
          fallbackClassName="text-[10px]"
        />
        <span className="text-xs font-medium">{task.project.name}</span>
      </div>
    </div>
  );
};

export default KanbanCard;
