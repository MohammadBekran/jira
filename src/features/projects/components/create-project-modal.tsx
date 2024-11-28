"use client";

import CreateProjectForm from "@/features/projects/components/create-project-form";
import { useCreateProjectModal } from "@/features/projects/core/hooks";

import ResponsiveModal from "@/components/responsive-modal";

const CreateProjectModal = () => {
  const { isOpen, setIsOpen, close } = useCreateProjectModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectForm onCancel={close} />
    </ResponsiveModal>
  );
};

export default CreateProjectModal;
