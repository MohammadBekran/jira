import { useState } from "react";
import { PencilIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DottedSeparator from "@/components/dotted-separator";
import { useUpdateTask } from "../../core/services/api/mutations.api";

interface ITaskDescriptionProps {
  taskId: string;
  description: string;
}

const TaskDescription = ({ taskId, description }: ITaskDescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const { mutate, isPending } = useUpdateTask();

  const handleUpdateTask = () => {
    mutate(
      { param: { taskId }, json: { description: descriptionValue } },
      {
        onSuccess: () => setIsEditing(false),
      }
    );
  };

  const onEdit = () => setIsEditing(!isEditing);

  const renderDescription = description ? description : "No description set";

  return (
    <div className="space-y-4 rounded-l border p-4">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">Overview</p>
        <Button size="sm" variant="secondary" onClick={onEdit}>
          {isEditing ? (
            <X className="size-2" />
          ) : (
            <PencilIcon className="size-4 " />
          )}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      <DottedSeparator className="my-4" />
      <div>
        {isEditing ? (
          <div className="flex flex-col justify-end gap-y-4">
            <Textarea
              value={descriptionValue}
              placeholder="Add a description..."
              disabled={isPending}
              rows={4}
              onChange={(e) => setDescriptionValue(e.target.value)}
            />
            <Button size="sm" disabled={isPending} onClick={handleUpdateTask}>
              Save Changes
            </Button>
          </div>
        ) : (
          <p className="text-muted-foreground">{renderDescription}</p>
        )}
      </div>
    </div>
  );
};

export default TaskDescription;
