import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";

const AuthProviderButtons = () => {
  return (
    <>
      <Button
        disabled={false}
        variant="secondary"
        size="lg"
        className="w-full "
      >
        <FcGoogle className="size-5 mr-2" />
        Login with Google
      </Button>
      <Button
        disabled={false}
        variant="secondary"
        size="lg"
        className="w-full "
      >
        <FaGithub className="size-5 mr-2" />
        Login with Github
      </Button>
    </>
  );
};

export default AuthProviderButtons;
