"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isSignInPath = pathname === "/sign-in";

  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="max-w-screen-2xl mx-auto p-4">
        <nav className="flex justify-between items-center">
          <Image src="/logo.svg" alt="logo" width={152} height={56} />
          <Button variant="secondary" asChild>
            <Link href={isSignInPath ? "/sign-up" : "/sign-in"}>
              {isSignInPath ? "Sign Up" : "Sign In"}
            </Link>
          </Button>
        </nav>
        <div className="flex flex-col justify-center items-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
