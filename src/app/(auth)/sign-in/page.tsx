import SignIn from "@/features/auth/components/sign-in";

import { protectRoute } from "@/core/actions";

const SignInPage = async () => {
  await protectRoute("/");

  return <SignIn />;
};

export default SignInPage;
