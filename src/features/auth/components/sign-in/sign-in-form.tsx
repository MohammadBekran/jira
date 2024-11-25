"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import AuthProviderButtons from "@/features/auth/components/auth-provider-buttons";
import { useLogin } from "@/features/auth/core/services/api/mutations.api";
import type { TSignInFormData } from "@/features/auth/core/types";
import { signInFormSchema } from "@/features/auth/core/validations";

import DottedSeparated from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const SignInForm = () => {
  const form = useForm<TSignInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate, isPending } = useLogin();

  const onSubmit = (values: TSignInFormData) => {
    mutate(values);
  };

  return (
    <>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPending}
              size="lg"
              className="w-full"
            >
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparated />
      </div>
      <CardContent className="flex flex-col gap-y-4 p-7">
        <AuthProviderButtons disabled={isPending} />
      </CardContent>
    </>
  );
};

export default SignInForm;
