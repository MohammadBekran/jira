import { SettingsIcon } from "lucide-react";
import Link from "next/link";

import MemberAvatar from "@/features/members/components/member-avatar";
import type { TMember } from "@/features/members/core/types";
import { useWorkspaceId } from "@/features/workspaces/core/hooks";

import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IMemberListProps {
  data: TMember[];
  total: number;
}

const MemberList = ({ data, total }: IMemberListProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <div className="rounded-lg space-y-4 col-span-1 p-4 border bg-white">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Members ({total})</span>
        <Button size="icon" variant="secondary" asChild>
          <Link href={`/workspaces/${workspaceId}/members`}>
            <SettingsIcon className="size-4 text-neutral-400" />
          </Link>
        </Button>
      </div>
      <DottedSeparator className="my-4" />
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((member) => {
          const { $id, name, email } = member;

          return (
            <li key={$id}>
              <Card className="rounded-lg shadow-none">
                <CardContent className="flex flex-col items-center gap-x-2 p-3">
                  <MemberAvatar name={name} className="size-12" />
                  <div className="overflow-hidden flex flex-col items-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="max-w-[100px] first-line:text-lg font-medium line-clamp-1 truncate">
                            {name}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>{name}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="max-w-[100px] text-sm line-clamp-1 truncate text-muted-foreground">
                            {email}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>{email}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardContent>
              </Card>
            </li>
          );
        })}
        <li className="hidden first-of-type:block text-sm text-center text-muted-foreground">
          No members found
        </li>
      </ul>
    </div>
  );
};

export default MemberList;
