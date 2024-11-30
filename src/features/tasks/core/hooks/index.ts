import { useParams } from "next/navigation";
import { parseAsBoolean, useQueryState } from "nuqs";

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

export { useCreateTaskModal, useTaskId };
