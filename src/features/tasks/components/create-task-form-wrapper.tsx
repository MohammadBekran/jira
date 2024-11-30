import { Loader } from "lucide-react";

import { useGetMembers } from "@/features/members/core/services/api/queries.api";
import { useGetProjects } from "@/features/projects/core/services/api/queries.api";
import CreateTaskForm from "@/features/tasks/components/create-task-form";
import { useWorkspaceId } from "@/features/workspaces/core/hooks";

import { Card, CardContent } from "@/components/ui/card";

const CreateTaskFormWrapper = ({ onCancel }: { onCancel?: () => void }) => {
  const workspaceId = useWorkspaceId();
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

  const isLoading = isLoadingProjects || isLoadingMembers;

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
    <CreateTaskForm
      onCancel={onCancel}
      projectOptions={projectOptions ?? []}
      memberOptions={memberOptions ?? []}
    />
  );
};

export default CreateTaskFormWrapper;
