import Link from "next/link";

import AuthProviderButtons from "@/features/auth/components/sign-in/auth-provider-buttons";
import SignInForm from "@/features/auth/components/sign-in/sign-in-form";

import DottedSeparated from "@/components/dotted-separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SignIn = () => {
  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex justify-center items-center text-center p-7">
        <CardTitle className="text-2xl">Welcome back!</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparated />
      </div>
      <CardContent className="p-7">
        <SignInForm />
      </CardContent>
      <div className="px-7">
        <DottedSeparated />
      </div>
      <CardContent className="flex flex-col gap-y-4 p-7">
        <AuthProviderButtons />
      </CardContent>
      <div className="px-7">
        <DottedSeparated />
      </div>
      <CardContent className="flex justify-center items-center p-7">
        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-blue-700">
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignIn;
