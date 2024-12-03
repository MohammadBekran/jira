import { CopyIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useResetInviteCode } from "@/features/workspaces/core/services/api/mutations.api";

import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useConfirm } from "@/core/hooks";
import { toast } from "@/lib/utils";

interface IResetInviteLinkProps {
  workspaceId: string;
  inviteCode: string;
  isPending: boolean;
}

const ResetInviteLink = ({
  workspaceId,
  inviteCode,
  isPending,
}: IResetInviteLinkProps) => {
  const router = useRouter();
  const [ResetInviteLinkDialog, confirmResetInviteLink] = useConfirm(
    "Reset invite link",
    "This will invalidate the current invite link.",
    "destructive"
  );
  const { mutate: resetInviteLink, isPending: isResettingInviteLink } =
    useResetInviteCode();

  const fullInviteLink = `${window.location.origin}/workspaces/${workspaceId}/join/${inviteCode}`;

  const handleCopyInviteLink = () => {
    navigator.clipboard
      .writeText(fullInviteLink)
      .then(() => toast.success("Invite link copied to clipboard"));
  };

  const handleResetInviteLink = async () => {
    const ok = await confirmResetInviteLink();

    if (!ok) return;

    resetInviteLink(
      { param: { workspaceId } },
      {
        onSuccess: () => router.refresh(),
      }
    );
  };

  return (
    <>
      <ResetInviteLinkDialog />
      <Card className="size-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Invite Members</h3>
            <p className="text-sm text-muted-foreground">
              Use the invite link to add members to your workspace
            </p>
            <div className="mt-4">
              <div className="flex items-center gap-x-2">
                <Input disabled value={fullInviteLink} />
                <Button
                  variant="secondary"
                  className="size-12"
                  onClick={handleCopyInviteLink}
                >
                  <CopyIcon className="size-5" />
                </Button>
              </div>
            </div>
            <DottedSeparator className="py-7" />
            <Button
              type="button"
              disabled={isPending || isResettingInviteLink}
              size="sm"
              variant="destructive"
              className="w-fit ml-auto mt-6"
              onClick={handleResetInviteLink}
            >
              Reset invite link
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ResetInviteLink;
