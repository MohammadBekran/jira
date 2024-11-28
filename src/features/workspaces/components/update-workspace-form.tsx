"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";

import DeleteWorkspace from "@/features/workspaces/components/delete-workspace";
import ResetInviteLink from "@/features/workspaces/components/reset-invite-link";
import { useUpdateWorkspace } from "@/features/workspaces/core/services/api/mutations.api";
import type {
  TUpdateWorkspaceFormData,
  TWorkspace,
} from "@/features/workspaces/core/types";
import { createWorkspaceSchema } from "@/features/workspaces/core/validations";

import DottedSeparated from "@/components/dotted-separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface IUpdateWorkspaceFormProps {
  onCancel?: () => void;
  initialValues: TWorkspace;
}

const UpdateWorkspaceForm = ({
  onCancel,
  initialValues,
}: IUpdateWorkspaceFormProps) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<TUpdateWorkspaceFormData>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? "",
    },
  });
  const { mutate, isPending } = useUpdateWorkspace();

  const handleBack = () =>
    onCancel ? onCancel : router.push(`/workspaces/${initialValues.$id}`);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      form.setValue("image", file);
    }
  };

  const handleDeleteImage = (deleteImage: () => void) => {
    deleteImage();

    if (inputRef.current) inputRef.current.value = "";
  };

  const onSubmit = (values: TUpdateWorkspaceFormData) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };

    mutate(
      {
        form: finalValues,
        param: { workspaceId: initialValues.$id },
      },
      {
        onSuccess: ({ data }) => {
          form.reset();
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Card className="size-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 space-y-0 p-7">
          <Button size="sm" variant="secondary" onClick={handleBack}>
            <ArrowLeftIcon className="size-4" />
            Back
          </Button>
          <CardTitle className="text-xl font-bold">
            {initialValues.name}
          </CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeparated />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workspace Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter workspace name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="relative overflow-hidden size-[72px] rounded-md">
                            <Image
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                              fill
                              alt="Logo"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <Avatar className="size-[72px]">
                            <AvatarFallback>
                              <ImageIcon className="size-[36px] text-neutral-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm">Workspace Icon</p>
                          <p className="text-sm text-muted-foreground">
                            JPG, PNG, SVG or JPEG, max 1mb
                          </p>
                          <input
                            type="file"
                            accept=".jpg, .png, .jpeg, .svg"
                            ref={inputRef}
                            disabled={isPending}
                            className="hidden"
                            onChange={handleImageChange}
                          />
                          {field.value ? (
                            <Button
                              type="button"
                              disabled={isPending}
                              variant="destructive"
                              size="xs"
                              className="w-fit mt-2"
                              onClick={() =>
                                handleDeleteImage(() => field.onChange(null))
                              }
                            >
                              Remove Image
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              disabled={isPending}
                              variant="teritary"
                              size="xs"
                              className="w-fit mt-2"
                              onClick={() => inputRef.current?.click()}
                            >
                              Upload Image
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
              <DottedSeparated className="py-7" />
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  disabled={isPending}
                  size="lg"
                  variant="secondary"
                  className={cn(!onCancel && "invisible")}
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending} size="lg">
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <ResetInviteLink
        workspaceId={initialValues.$id}
        inviteCode={initialValues.inviteCode}
        isPending={isPending}
      />
      <DeleteWorkspace workspaceId={initialValues.$id} isPending={isPending} />
    </div>
  );
};

export default UpdateWorkspaceForm;
