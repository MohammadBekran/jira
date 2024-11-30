"use client";

import { useRouter } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

import WorkspaceAvatar from "@/features/workspaces/components/workspace-avatar";
import {
  useCreateWorkspaceModal,
  useWorkspaceId,
} from "@/features/workspaces/core/hooks";
import { useGetWorkspaces } from "@/features/workspaces/core/services/api/queries.api";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const WorkspaceSwitcher = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { open } = useCreateWorkspaceModal();
  const { data: workspaces } = useGetWorkspaces();

  const onSelectWorkspace = (id: string) => router.push(`/workspaces/${id}`);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <p className="text-xs uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleFill
          className="size-5 cursor-pointer transition text-neutral-500 hover:opacity-75"
          onClick={open}
        />
      </div>
      <Select onValueChange={onSelectWorkspace} value={workspaceId}>
        <SelectTrigger className="w-full font-medium p-1 bg-neutral-200">
          <SelectValue placeholder="No workspace selected" />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.documents.map((workspace) => (
            <SelectItem key={workspace.$id} value={workspace.$id}>
              <div className="flex justify-start items-center gap-3 font-medium">
                <WorkspaceAvatar
                  image={workspace.imageUrl}
                  name={workspace.name}
                />
                <span className="truncate">{workspace.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default WorkspaceSwitcher;
