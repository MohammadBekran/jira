import { useRouter } from "next/navigation";

import MemberAvatar from "@/features/members/components/member-avatar";
import type { TMember } from "@/features/members/core/types";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import type { TProject } from "@/features/projects/core/types";
import { ETaskStatus } from "@/features/tasks/core/enum";
import { useWorkspaceId } from "@/features/workspaces/core/hooks";

import { cn } from "@/lib/utils";

interface IEventCardProps {
  id: string;
  title: string;
  status: ETaskStatus;
  project: TProject;
  assignee: TMember;
}

const statusColorMap: Record<ETaskStatus, string> = {
  [ETaskStatus.BACKLOG]: "border-l-pink-500",
  [ETaskStatus.TODO]: "border-l-red-500",
  [ETaskStatus.IN_PROGRESS]: "border-l-yellow-500",
  [ETaskStatus.IN_REVIEW]: "border-l-blue-500",
  [ETaskStatus.DONE]: "border-l-emerald-500",
};

const EventCard = ({
  id,
  title,
  status,
  project,
  assignee,
}: IEventCardProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const handleEventClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };

  return (
    <div className="px-2">
      <div
        className={cn(
          "flex flex-col gap-y-1.5 rounded-md border border-l-4 p-1.5 transition-none cursor-pointer text-xs bg-white text-primary",
          statusColorMap[status]
        )}
        onClick={handleEventClick}
      >
        <p>{title}</p>
        <div className="flex items-center gap-x-1">
          <MemberAvatar name={assignee?.name} />
          <div className="size-1 rounded-full bg-neutral-300" />
          <ProjectAvatar name={project?.name} image={project?.imageUrl} />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
