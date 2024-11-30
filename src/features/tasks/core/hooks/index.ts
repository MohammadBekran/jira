import { useParams } from "next/navigation";
import {
  parseAsBoolean,
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
  const [isOpen, setIsOpen] = useQueryState(
    "create-task",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close, setIsOpen };
};

const useUpdateTaskModal = () => {
  const [taskId, setTaskId] = useQueryState("update-task", parseAsString);

  const open = (id: string) => setTaskId(id);
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
  useTaskId,
  useCreateTaskModal,
  useUpdateTaskModal,
  useTaskView,
  useTaskFilters,
};
