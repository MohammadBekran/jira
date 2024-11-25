"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isLoginPath = pathname === "/sign-in";

  return (
    <main className="bg-neutral-100 min-h-screen-2xl">
      <div className="max-w-screen mx-auto p-4">
        <nav className="flex justify-between items-center">
          <Image src="/logo.svg" alt="logo" width={152} height={56} />
          <Button variant="secondary" asChild>
            <Link href={isLoginPath ? "/sign-up" : "/sign-in"}>
              {isLoginPath ? "Sign up" : "Sign in"}
            </Link>
          </Button>
        </nav>
      </div>
      <div className="flex flex-col justify-center items-center pt-4 md:pt-14">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
