"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  useInviteCode,
  useWorkspaceId,
} from "@/features/workspaces/core/hooks";
import { useJoinWorkspace } from "@/features/workspaces/core/services/api/mutations.api";

import DottedSeparated from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const JoinWorkspaceForm = ({
  initialValues,
}: {
  initialValues: { name: string };
}) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const inviteCode = useInviteCode();
  const { mutate, isPending } = useJoinWorkspace();

  const onSubmit = () => {
    mutate(
      { param: { workspaceId }, json: { code: inviteCode } },
      {
        onSuccess: ({ data }) => router.push(`/workspaces/${data.$id}`),
      }
    );
  };

  return (
    <Card className="size-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join workspace</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join <strong>{initialValues.name}</strong>{" "}
          workspace
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparated />
      </div>
      <CardContent className="p-7">
        <div className="flex flex-col justify-between items-center gap-2 lg:flex-row">
          <Button
            type="button"
            disabled={isPending}
            size="lg"
            variant="secondary"
            asChild
            className="w-full lg:w-fit"
          >
            <Link href="/">Cancel</Link>
          </Button>
          <Button
            type="button"
            disabled={isPending}
            size="lg"
            className="w-full lg:w-fit"
            onClick={onSubmit}
          >
            Join Workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JoinWorkspaceForm;
