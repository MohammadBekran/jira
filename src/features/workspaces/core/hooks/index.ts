import { useParams } from "next/navigation";
import { useQueryState, parseAsBoolean } from "nuqs";

const useWorkspaceId = () => {
  const params = useParams();

  return params.workspaceId as string;
};

const useCreateWorkspaceModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-workspace",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close, setIsOpen };
};
export { useWorkspaceId, useCreateWorkspaceModal };
