import type { Metadata } from "next";

import SignUp from "@/features/auth/components/sign-up";

import { protectRoute } from "@/core/actions";

const SignUpPage = async () => {
  await protectRoute("/");

  return <SignUp />;
};

export const metadata: Metadata = {
  title: "Sign up",
  description: "Register to the website",
};

export default SignUpPage;
