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
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });

      toast.success("Workspace Created");
    },
  });

  return mutation;
};

export { useCreateWorkspace };
