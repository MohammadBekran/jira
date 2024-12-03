import type { Metadata } from "next";

import SignIn from "@/features/auth/components/sign-in";

import { protectRoute } from "@/core/actions";

const SignInPage = async () => {
  await protectRoute("/");

  return <SignIn />;
};

export const metadata: Metadata = {
  title: "Sign in",
  description: "login to the website",
};

export default SignInPage;
