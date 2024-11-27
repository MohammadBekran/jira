import Image from "next/image";
import Link from "next/link";

import DottedSeparated from "@/components/dotted-separator";
import Navigation from "@/components/navigation";
import WorkspaceSwitcher from "@/components/workspace-switcher";

const Sidebar = () => {
  return (
    <aside className="size-full p-4 bg-neutral-100">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={164} height={48} />
      </Link>
      <DottedSeparated className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparated className="my-4" />
      <Navigation />
    </aside>
  );
};

export default Sidebar;
