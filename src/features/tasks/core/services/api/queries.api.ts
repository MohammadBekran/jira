import { useQuery } from "@tanstack/react-query";

import { ETaskStatus } from "@/features/tasks/core/enum";

import client from "@/lib/rpc";

interface IUseGetTasksProps {
  workspaceId: string;
  projectId?: string | null;
  search?: string | null;
  status?: ETaskStatus | null;
  dueDate?: string | null;
  assigneeId?: string | null;
}

const useGetTasks = ({
  workspaceId,
  projectId,
  search,
  status,
  dueDate,
  assigneeId,
}: IUseGetTasksProps) => {
  const query = useQuery({
    queryKey: [
      "tasks",
      workspaceId,
      projectId,
      search,
      status,
      dueDate,
      assigneeId,
    ],
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query: {
          workspaceId,
          projectId: projectId ?? undefined,
          search: search ?? undefined,
          status: status ?? undefined,
          dueDate: dueDate ?? undefined,
          assigneeId: assigneeId ?? undefined,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch tasks");

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};

const useGetTask = ({ taskId }: { taskId: string }) => {
  const query = useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const response = await client.api.tasks[":taskId"]["$get"]({
        param: { taskId },
      });

      if (!response.ok) throw new Error("Failed to fetch task");

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};

export { useGetTasks, useGetTask };
