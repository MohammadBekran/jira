"use client";

import { Loader, LogOut } from "lucide-react";

import { useLogout } from "@/features/auth/core/services/api/mutations.api";
import { useCurrent } from "@/features/auth/core/services/api/queries.api";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DottedSeparator from "@/components/dotted-separator";

const UserButton = () => {
  const { data: user, isLoading } = useCurrent();
  const { mutate: logout } = useLogout();

  if (isLoading) {
    return (
      <div className="size-10 flex justify-center items-center rounded-full bg-neutral-200 border border-neutral-300">
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) return null;

  const { name, email } = user;

  const avatarFallback = name
    ? name.charAt(1).toUpperCase()
    : email.charAt(0).toUpperCase() ?? "U";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar className="size-10 transition border-neutral-300 hover:opacity-75">
          <AvatarFallback className="font-medium bg-neutral-200 text-neutral-500">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col justify-center items-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px] border-neutral-300">
            <AvatarFallback className="text-xl font-medium bg-neutral-200 text-neutral-500">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center items-center">
            <p className="text-sm font-medium text-neutral-500">
              {name ?? "User"}
            </p>
            <p className="text-sm text-neutral-500">{email ?? "User"}</p>
          </div>
        </div>
        <DottedSeparator className="mb-1" />
        <DropdownMenuItem
          className="h-10 flex justify-center items-center font-medium cursor-pointer text-amber-700"
          onClick={logout}
        >
          <LogOut className="size-4 " />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
