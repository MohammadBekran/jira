"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";

import { useCreateProject } from "@/features/projects/core/services/api/mutations.api";
import type { TCreateProjectFormData } from "@/features/projects/core/types";
import { createProjectSchema } from "@/features/projects/core/validations";
import { useWorkspaceId } from "@/features/workspaces/core/hooks";

import DottedSeparator from "@/components/dotted-separator";
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

const CreateProjectForm = ({ onCancel }: { onCancel?: () => void }) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<TCreateProjectFormData>({
    resolver: zodResolver(createProjectSchema.omit({ workspaceId: true })),
    defaultValues: {
      name: "",
      image: "",
    },
  });
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useCreateProject();

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

  const onSubmit = (values: TCreateProjectFormData) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
      workspaceId,
    };

    mutate(
      { form: finalValues },
      {
        onSuccess: ({ data }) => {
          form.reset();

          router.push(`/workspaces/${workspaceId}/projects/${data.$id}`);
        },
      }
    );
  };

  return (
    <Card className="size-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Create a new project
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
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
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project name" {...field} />
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
                        <p className="text-sm">Project Icon</p>
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
            <DottedSeparator className="py-7" />
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
                Create Project
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateProjectForm;
