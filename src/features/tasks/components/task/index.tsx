"use client";

import TaskBreadcrumbs from "@/features/tasks/components/task//task-breadcrumbs";
import TaskOverview from "@/features/tasks/components/task/task-overview";
import TaskDescription from "@/features/tasks/components/task/task-description";
import { useTaskId } from "@/features/tasks/core/hooks";
import { useGetTask } from "@/features/tasks/core/services/api/queries.api";

import DottedSeparated from "@/components/dotted-separator";
import PageLoader from "@/components/page-loader";
import PageError from "@/components/page-error";

const Task = () => {
  const taskId = useTaskId();
  const { data, isLoading } = useGetTask({ taskId });

  if (isLoading) return <PageLoader />;

  if (!data) return <PageError message="Task not found" />;

  return (
    <div className="flex flex-col">
      <TaskBreadcrumbs task={data} project={data.project} />
      <DottedSeparated className="my-6" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TaskOverview data={data} />
        <TaskDescription taskId={data.$id} description={data.description!} />
      </div>
    </div>
  );
};

export default Task;
