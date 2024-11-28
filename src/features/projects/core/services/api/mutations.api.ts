import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import client from "@/lib/rpc";
import { toast } from "@/lib/utils";

type TCreateProjectResponseType = InferResponseType<
  (typeof client.api.projects)["$post"],
  200
>;
type TCreateProjectRequestType = InferRequestType<
  (typeof client.api.projects)["$post"]
>;

type TUpdateProjectResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["$patch"],
  200
>;
type TUpdateProjectRequestType = InferRequestType<
  (typeof client.api.projects)[":projectId"]["$patch"]
>;

type TDeleteProjectResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["$delete"],
  200
>;
type TDeleteProjectRequestType = InferRequestType<
  (typeof client.api.projects)[":projectId"]["$delete"]
>;

const useCreateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TCreateProjectResponseType,
    Error,
    TCreateProjectRequestType
  >({
    mutationFn: async ({ form }) => {
      const response = await client.api.projects.$post({ form });

      if (!response.ok) throw new Error("Failed to create project");

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Project created");

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
    onError: () => toast.error("Failed to create project"),
  });

  return mutation;
};

const useUpdateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TUpdateProjectResponseType,
    Error,
    TUpdateProjectRequestType
  >({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.projects[":projectId"]["$patch"]({
        form,
        param,
      });

      if (!response.ok) throw new Error("Failed to update project");

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Project updated");

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["project", data.$id],
      });
    },
    onError: () => toast.error("Failed to update project"),
  });

  return mutation;
};

const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TDeleteProjectResponseType,
    Error,
    TDeleteProjectRequestType
  >({
    mutationFn: async ({ param }) => {
      const response = await client.api.projects[":projectId"]["$delete"]({
        param,
      });

      if (!response.ok) throw new Error("Failed to delete project");

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Project deleted");

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["project", data.$id],
      });
    },
    onError: () => toast.error("Failed to delete project"),
  });

  return mutation;
};

export { useCreateProject, useDeleteProject, useUpdateProject };
