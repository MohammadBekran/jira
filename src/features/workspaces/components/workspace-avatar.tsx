import Image from "next/image";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface IWorkspaceAvatarProps {
  image?: string;
  name: string;
  className?: string;
}

const WorkspaceAvatar = ({ image, name, className }: IWorkspaceAvatarProps) => {
  if (image) {
    return (
      <div
        className={cn("relative overflow-hidden size-10 rounded-md", className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn("size-10 rounded-md", className)}>
      <AvatarFallback className="rounded-md text-lg font-semibold uppercase text-white bg-blue-600">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};

export default WorkspaceAvatar;
