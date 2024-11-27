import Image from "next/image";
import Link from "next/link";

import UserButton from "@/components/user-button";

const StandaloneLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="max-w-screen-2xl mx-auto p-4">
        <nav className="h-[73px] flex justify-between items-center">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={152} height={56} />
          </Link>
          <UserButton />
        </nav>
        <div className="flex flex-col justify-center items-center py-4">
          {children}
        </div>
      </div>
    </main>
  );
};

export default StandaloneLayout;
