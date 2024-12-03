"use client";

import CreateTaskFormWrapper from "@/features/tasks/components/create-task-form-wrapper";
import { useCreateTaskModal } from "@/features/tasks/core/hooks";

import ResponsiveModal from "@/components/responsive-modal";

const CreateTaskModal = () => {
  const { status, setStatus } = useCreateTaskModal();

  const onClose = () => setStatus(null);

  return (
    <ResponsiveModal open={status ?? null} onOpenChange={setStatus}>
      <CreateTaskFormWrapper onCancel={onClose} />
    </ResponsiveModal>
  );
};

export default CreateTaskModal;
