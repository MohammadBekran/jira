"use client";

import UpdateTaskFormWrapper from "@/features/tasks/components/update-task-form-wrapper";
import { useUpdateTaskModal } from "@/features/tasks/core/hooks";

import ResponsiveModal from "@/components/responsive-modal";

const UpdateTaskModal = () => {
  const { taskId, setTaskId, close } = useUpdateTaskModal();

  return (
    <ResponsiveModal open={!!taskId} onOpenChange={setTaskId}>
      {taskId && <UpdateTaskFormWrapper id={taskId} onCancel={close} />}
    </ResponsiveModal>
  );
};

export default UpdateTaskModal;
