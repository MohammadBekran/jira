import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import client from "@/lib/rpc";
import { toast } from "@/lib/utils";

type TUpdateMemberResponseType = InferResponseType<
  (typeof client.api.members)[":memberId"]["$patch"],
  200
>;
type TUpdateMemberRequestType = InferRequestType<
  (typeof client.api.members)[":memberId"]["$patch"]
>;

type TDeleteMemberResponseType = InferResponseType<
  (typeof client.api.members)[":memberId"]["$delete"],
  200
>;
type TDeleteMemberRequestType = InferRequestType<
  (typeof client.api.members)[":memberId"]["$delete"]
>;

const useUpdateMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TUpdateMemberResponseType,
    Error,
    TUpdateMemberRequestType
  >({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.members[":memberId"]["$patch"]({
        param,
        json,
      });

      if (!response.ok) throw new Error("Failed to update member");

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Member updated");

      queryClient.invalidateQueries({
        queryKey: ["members"],
      });
    },
    onError: () => toast.error("Failed to update member"),
  });

  return mutation;
};

const useDeleteMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TDeleteMemberResponseType,
    Error,
    TDeleteMemberRequestType
  >({
    mutationFn: async ({ param }) => {
      const response = await client.api.members[":memberId"]["$delete"]({
        param,
      });

      if (!response.ok) throw new Error("Failed to delete member");

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Member deleted");

      queryClient.invalidateQueries({
        queryKey: ["members"],
      });
    },
    onError: () => toast.error("Failed to delete member"),
  });

  return mutation;
};

export { useUpdateMember, useDeleteMember };
