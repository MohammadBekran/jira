"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { signUpWithGithub, signUpWithGoogle } from "@/lib/oauth";

import { Button } from "@/components/ui/button";

const AuthProviderButtons = ({ disabled }: { disabled: boolean }) => {
  return (
    <>
      <Button
        disabled={disabled}
        variant="secondary"
        size="lg"
        className="w-full"
        onClick={signUpWithGoogle}
      >
        <FcGoogle className="size-5 " />
        Login with Google
      </Button>
      <Button
        disabled={disabled}
        variant="secondary"
        size="lg"
        className="w-full"
        onClick={signUpWithGithub}
      >
        <FaGithub className="size-5 " />
        Login with Github
      </Button>
    </>
  );
};

export default AuthProviderButtons;
