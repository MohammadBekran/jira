import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface IMemberAvatarProps {
  name: string;
  className?: string;
  fallbackClassName?: string;
}

const MemberAvatar = ({
  name,
  className,
  fallbackClassName,
}: IMemberAvatarProps) => {
  const nameToRender = name.charAt(0).toUpperCase();

  return (
    <Avatar
      className={cn(
        "size-5 rounded-full transition border border-neutral-300",
        className
      )}
    >
      <AvatarFallback
        className={cn(
          "flex justify-center items-center font-medium bg-neutral-200 text-neutral-500",
          fallbackClassName
        )}
      >
        {nameToRender}
      </AvatarFallback>
    </Avatar>
  );
};

export default MemberAvatar;
