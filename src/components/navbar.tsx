"use client";

import { usePathname } from "next/navigation";

import { useWorkspaceId } from "@/features/workspaces/core/hooks";

import MobileSidebar from "@/components/mobile-sidebar";
import UserButton from "@/components/user-button";
import { NAVIGATION_PAGE_INFORMATION } from "@/core/constants";

const Navbar = () => {
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();

  const activeRoute = NAVIGATION_PAGE_INFORMATION.find((item) =>
    pathname.includes(`/workspaces/${workspaceId}${item.path}`)
  );

  return (
    <nav className="flex justify-between items-center pt-4 px-6 ">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">{activeRoute?.title}</h1>
        <p className="text-muted-foreground">{activeRoute?.description}</p>
      </div>
      <UserButton />
      <MobileSidebar />
    </nav>
  );
};

export default Navbar;
