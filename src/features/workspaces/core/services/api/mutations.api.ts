import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import client from "@/lib/rpc";
import { toast } from "@/lib/utils";

type TCreateWorkSpaceResponseType = InferResponseType<
  (typeof client.api.workspaces)["$post"],
  200
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

type TDeleteWorkSpaceResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["$delete"],
  200
>;
type TDeleteWorkspaceRequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["$delete"]
>;

type TResetInviteCodeResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["reset-invite-code"]["$post"],
  200
>;
type TResetInviteCodeRequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["reset-invite-code"]["$post"]
>;

type TJoinWorkspaceResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["join"]["$post"],
  200
>;
type TJoinWorkspaceRequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["join"]["$post"]
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
    onError: () => toast.error("Failed to create workspace"),
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
    onError: () => toast.error("Failed to update workspace"),
  });

  return mutation;
};

const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TDeleteWorkSpaceResponseType,
    Error,
    TDeleteWorkspaceRequestType
  >({
    mutationFn: async ({ param }) => {
      const response = await client.api.workspaces[":workspaceId"]["$delete"]({
        param,
      });

      if (!response.ok) throw new Error("Failed to delete workspace");

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Workspace deleted");

      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
      queryClient.invalidateQueries({
        queryKey: ["workspace", data.$id],
      });
    },
    onError: () => toast.error("Failed to delete workspace"),
  });

  return mutation;
};

const useResetInviteCode = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TResetInviteCodeResponseType,
    Error,
    TResetInviteCodeRequestType
  >({
    mutationFn: async ({ param }) => {
      const response = await client.api.workspaces[":workspaceId"][
        "reset-invite-code"
      ]["$post"]({
        param,
      });

      if (!response.ok) throw new Error("Failed to reset invite code");

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Invite code reset");

      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
      queryClient.invalidateQueries({
        queryKey: ["workspace", data.$id],
      });
    },
    onError: () => toast.error("Failed to reset invite code"),
  });

  return mutation;
};

const useJoinWorkspace = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TJoinWorkspaceResponseType,
    Error,
    TJoinWorkspaceRequestType
  >({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.workspaces[":workspaceId"]["join"][
        "$post"
      ]({
        param,
        json,
      });

      if (!response.ok) throw new Error("Failed to join workspace");

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Joined workspace");

      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
      queryClient.invalidateQueries({
        queryKey: ["workspace", data.$id],
      });
    },
    onError: () => toast.error("Failed to join workspace"),
  });

  return mutation;
};

export {
  useCreateWorkspace,
  useDeleteWorkspace,
  useJoinWorkspace,
  useResetInviteCode,
  useUpdateWorkspace,
};
