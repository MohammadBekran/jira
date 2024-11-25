import SignUp from "@/features/auth/components/sign-up";

import { protectRoute } from "@/core/actions";

const SignUpPage = async () => {
  await protectRoute("/");

  return <SignUp />;
};

export default SignUpPage;
