"use server";

import { redirect } from "next/navigation";

import getCurrent from "@/features/auth/core/actions";

export const protectRoute = async (
  redirectUrl: string,
  isLogin: boolean = true
) => {
  const user = await getCurrent();

  if (isLogin ? user : !user) redirect(redirectUrl);
};
