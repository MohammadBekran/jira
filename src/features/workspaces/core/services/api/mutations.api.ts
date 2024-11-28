import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import client from "@/lib/rpc";
import { toast } from "@/lib/utils";

type TCreateWorkSpaceResponseType = InferResponseType<
  (typeof client.api.workspaces)["$post"]
>;
type TCreateWorkspaceRequestType = InferRequestType<
  (typeof client.api.workspaces)["$post"]
>;

type TUpdateWorkSpaceResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["$patch"],
  200
>;
type TUpdateWorkspaceRequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["$patch"]
>;

const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TCreateWorkSpaceResponseType,
    Error,
    TCreateWorkspaceRequestType
  >({
    mutationFn: async ({ form }) => {
      const response = await client.api.workspaces.$post({ form });

      if (!response.ok) throw new Error("Failed to create workspace");

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Workspace created");

      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },
    onError: () => toast.error("Something went wrong"),
  });

  return mutation;
};

const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TUpdateWorkSpaceResponseType,
    Error,
    TUpdateWorkspaceRequestType
  >({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.workspaces[":workspaceId"]["$patch"]({
        form,
        param,
      });

      if (!response.ok) throw new Error("Failed to update workspace");

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Workspace updated");

      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
      queryClient.invalidateQueries({
        queryKey: ["workspace", data.$id],
      });
    },
    onError: () => toast.error("Something went wrong"),
  });

  return mutation;
};

export { useCreateWorkspace, useUpdateWorkspace };
