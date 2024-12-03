import Image from "next/image";
import Link from "next/link";

import DottedSeparator from "@/components/dotted-separator";
import Navigation from "@/components/navigation";
import Projects from "@/components/projects";
import WorkspaceSwitcher from "@/components/workspace-switcher";

const Sidebar = () => {
  return (
    <aside className="size-full p-4 bg-neutral-100">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={164} height={48} />
      </Link>
      <DottedSeparator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="my-4" />
      <Navigation />
      <DottedSeparator className="my-4" />
      <Projects />
    </aside>
  );
};

export default Sidebar;
