import Link from "next/link";

import SignUpForm from "@/features/auth/components/sign-up/sign-up-form";

import DottedSeparated from "@/components/dotted-separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SignUp = () => {
  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex justify-center items-center text-center p-7">
        <CardTitle className="text-2xl">Sign up</CardTitle>
        <CardDescription>
          By signing up, you agree to our{" "}
          <Link href="/privacy" className="text-blue-700">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="text-blue-700">
            Terms of Service
          </Link>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparated />
      </div>
      <SignUpForm />
      <div className="px-7">
        <DottedSeparated />
      </div>
      <CardContent className="flex justify-center items-center p-7">
        <p className="text-center">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-700">
            Sign In
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUp;
