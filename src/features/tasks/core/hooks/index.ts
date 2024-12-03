import { useParams } from "next/navigation";
import {
  parseAsString,
  parseAsStringEnum,
  useQueryState,
  useQueryStates,
} from "nuqs";

import { ETaskStatus } from "@/features/tasks/core/enum";

const useTaskId = () => {
  const params = useParams();

  return params.taskId as string;
};

const useCreateTaskModal = () => {
  const [status, setStatus] = useQueryState("create-task");

  return { status, setStatus };
};

const useUpdateTaskModal = () => {
  const [taskId, setTaskId] = useQueryState("update-task", parseAsString);

  const open = (taskId: string) => setTaskId(taskId);
  const close = () => setTaskId(null);

  return { taskId, open, close, setTaskId };
};

const useTaskView = () => {
  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  });

  return { view, setView };
};

const useTaskFilters = () => {
  return useQueryStates({
    projectId: parseAsString,
    status: parseAsStringEnum(Object.values(ETaskStatus)),
    search: parseAsString,
    dueDate: parseAsString,
    assigneeId: parseAsString,
  });
};

export {
  useCreateTaskModal,
  useTaskFilters,
  useTaskId,
  useTaskView,
  useUpdateTaskModal,
};
