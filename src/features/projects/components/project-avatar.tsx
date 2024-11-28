import Image from "next/image";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface IProjectAvatarProps {
  image?: string;
  name: string;
  className?: string;
  fallbackClassName?: string;
}

const ProjectAvatar = ({
  image,
  name,
  className,
  fallbackClassName,
}: IProjectAvatarProps) => {
  if (image) {
    return (
      <div
        className={cn("relative overflow-hidden size-5 rounded-md", className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn("size-5 rounded-md", className)}>
      <AvatarFallback
        className={cn(
          "rounded-md text-sm font-semibold uppercase text-white bg-blue-600",
          fallbackClassName
        )}
      >
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProjectAvatar;
