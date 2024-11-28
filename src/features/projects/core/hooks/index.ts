import { useParams } from "next/navigation";
import { parseAsBoolean, useQueryState } from "nuqs";

const useProjectId = () => {
  const params = useParams();

  return params.projectId as string;
};

const useCreateProjectModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-project",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close, setIsOpen };
};

export { useCreateProjectModal, useProjectId };
