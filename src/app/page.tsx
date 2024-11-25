"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import useCurrent from "@/features/auth/core/services/api/queries.api";
import { useLogout } from "@/features/auth/core/services/api/mutations.api";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const router = useRouter();
  const { data, isLoading } = useCurrent();
  const { mutate } = useLogout();

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/sign-in");
    }
  }, [data, isLoading, router]);

  return (
    <div>
      <Button onClick={mutate}>Logout</Button>
    </div>
  );
};

export default HomePage;
