import { useDeleteProject } from "@/features/projects/core/services/api/mutations.api";

import DottedSeparated from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useConfirm } from "@/core/hooks";

interface IDeleteProjectProps {
  projectId: string;
  isPending: boolean;
}

const DeleteProject = ({ projectId, isPending }: IDeleteProjectProps) => {
  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Project",
    "This action cannot be undone.",
    "destructive"
  );

  const { mutate: deleteProject, isPending: isDeletingProject } =
    useDeleteProject();

  const handleDelete = async () => {
    const ok = await confirmDelete();

    if (!ok) return;

    deleteProject(
      {
        param: { projectId },
      },
      {
        onSuccess: () => (window.location.href = "/"),
      }
    );
  };

  return (
    <>
      <DeleteDialog />
      <Card className="size-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a project is irreversible and will remove all associated
              data.
            </p>
            <DottedSeparated className="py-7" />
            <Button
              type="button"
              disabled={isPending || isDeletingProject}
              size="sm"
              variant="destructive"
              className="w-fit ml-auto mt-6"
              onClick={handleDelete}
            >
              Delete Project
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DeleteProject;
