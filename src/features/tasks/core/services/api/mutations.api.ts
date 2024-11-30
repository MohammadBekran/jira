import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import client from "@/lib/rpc";
import { toast } from "@/lib/utils";

type TCreateTaskResponseType = InferResponseType<
  (typeof client.api.tasks)["$post"],
  200
>;
type TCreateTaskRequestType = InferRequestType<
  (typeof client.api.tasks)["$post"]
>;

type TDeleteTaskResponseType = InferResponseType<
  (typeof client.api.tasks)[":taskId"]["$delete"],
  200
>;
type TDeleteTaskRequestType = InferRequestType<
  (typeof client.api.tasks)[":taskId"]["$delete"]
>;

const useCreateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TCreateTaskResponseType,
    Error,
    TCreateTaskRequestType
  >({
    mutationFn: async ({ json }) => {
      const response = await client.api.tasks.$post({ json });

      if (!response.ok) throw new Error("Failed to create task");

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Task created");

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: () => toast.error("Failed to create task"),
  });

  return mutation;
};

const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    TDeleteTaskResponseType,
    Error,
    TDeleteTaskRequestType
  >({
    mutationFn: async ({ param }) => {
      const response = await client.api.tasks[":taskId"]["$delete"]({ param });

      if (!response.ok) throw new Error("Failed to delete task");

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Task deleted");

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["task", data.$id],
      });
    },
    onError: () => toast.error("Failed to create task"),
  });

  return mutation;
};

export { useCreateTask, useDeleteTask };
