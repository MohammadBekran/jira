"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useWorkspaceId } from "@/features/workspaces/core/hooks";

import { NAVIGATION_ROUTES } from "@/core/constants";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();

  return (
    <ul className="flex flex-col">
      {NAVIGATION_ROUTES.map((item) => {
        const fullHref = `/workspaces/${workspaceId}${item.href}`;
        const isActive = pathname === fullHref;
        const Icon = isActive ? item.activeIcon : item.icon;

        return (
          <li key={item.href}>
            <Link href={fullHref}>
              <div
                className={cn(
                  "flex items-center gap-2.5 p-2.5 rounded-md font-medium transition text-neutral-500 hover:text-primary",
                  isActive &&
                    "shadow-sm bg-white text-primary hover:opacity-100"
                )}
              >
                <Icon className="size-5 text-neutral-500" />
                {item.label}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Navigation;
