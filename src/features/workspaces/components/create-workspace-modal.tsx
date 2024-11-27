"use client";

import CreateWorkspaceForm from "@/features/workspaces/components/create-workspace-form";
import { useCreateWorkspaceModal } from "@/features/workspaces/core/hooks";

import ResponsiveModal from "@/components/responsive-modal";

const CreateWorkspaceModal = () => {
  const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceForm onCancel={close} />
    </ResponsiveModal>
  );
};

export default CreateWorkspaceModal;
