import { useDeleteWorkspace } from "@/features/workspaces/core/services/api/mutations.api";

import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useConfirm } from "@/core/hooks";

interface IDeleteWorkspaceProps {
  workspaceId: string;
  isPending: boolean;
}

const DeleteWorkspace = ({ workspaceId, isPending }: IDeleteWorkspaceProps) => {
  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Workspace",
    "This action cannot be undone.",
    "destructive"
  );

  const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } =
    useDeleteWorkspace();

  const handleDelete = async () => {
    const ok = await confirmDelete();

    if (!ok) return;

    deleteWorkspace(
      {
        param: { workspaceId },
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
              Deleting a workspace is irreversible and will remove all
              associated data.
            </p>
            <DottedSeparator className="py-7" />
            <Button
              type="button"
              disabled={isPending || isDeletingWorkspace}
              size="sm"
              variant="destructive"
              className="w-fit ml-auto mt-6"
              onClick={handleDelete}
            >
              Delete Workspace
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DeleteWorkspace;
