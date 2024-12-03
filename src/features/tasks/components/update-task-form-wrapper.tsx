import { Loader } from "lucide-react";

import { useGetMembers } from "@/features/members/core/services/api/queries.api";
import { useGetProjects } from "@/features/projects/core/services/api/queries.api";
import UpdateTaskForm from "@/features/tasks/components/update-task-form";
import { useGetTask } from "@/features/tasks/core/services/api/queries.api";
import { useWorkspaceId } from "@/features/workspaces/core/hooks";

import { Card, CardContent } from "@/components/ui/card";

interface IUpdateTaskFormWrapperProps {
  id: string;
  onCancel?: () => void;
}

const UpdateTaskFormWrapper = ({
  id,
  onCancel,
}: IUpdateTaskFormWrapperProps) => {
  const workspaceId = useWorkspaceId();
  const { data: task, isLoading: isLoadingTask } = useGetTask({
    taskId: id,
  });
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const projectOptions = projects?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl,
  }));

  const memberOptions = members?.documents.map((member) => ({
    id: member.$id,
    name: member.name,
  }));

  const isLoading = isLoadingProjects || isLoadingMembers || isLoadingTask;

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="h-full flex justify-center items-center">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <UpdateTaskForm
      onCancel={onCancel}
      projectOptions={projectOptions ?? []}
      memberOptions={memberOptions ?? []}
      initialValues={task!}
    />
  );
};

export default UpdateTaskFormWrapper;
