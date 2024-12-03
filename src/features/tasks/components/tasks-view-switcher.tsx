"use client";

import { Loader, PlusIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataCalendar from "@/features/tasks/components/data-calendar";
import DataFilters from "@/features/tasks/components/data-filters";
import DataKanban from "@/features/tasks/components/data-kanban";
import DataTable from "@/features/tasks/components/data-table";
import { TASK_COLUMNS } from "@/features/tasks/core/constants";
import {
  useCreateTaskModal,
  useTaskFilters,
  useTaskView,
} from "@/features/tasks/core/hooks";
import { useBulkUpdateTasks } from "@/features/tasks/core/services/api/mutations.api";
import { useGetTasks } from "@/features/tasks/core/services/api/queries.api";
import type { TUpdateBulkOnchangeTask } from "@/features/tasks/core/types";
import { useWorkspaceId } from "@/features/workspaces/core/hooks";

import DottedSeparated from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";

const TasksViewSwitcher = ({
  hideProjectFilters,
}: {
  hideProjectFilters?: boolean;
}) => {
  const [{ projectId, status, dueDate, assigneeId }] = useTaskFilters();
  const workspaceId = useWorkspaceId();
  const { setStatus } = useCreateTaskModal();
  const { view, setView } = useTaskView();
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId,
    status,
    dueDate,
    assigneeId,
  });
  const { mutate: bulkUpdate } = useBulkUpdateTasks();

  const onKanbanChange = (tasks: TUpdateBulkOnchangeTask) => {
    bulkUpdate({ json: { tasks } });
  };

  return (
    <Tabs
      value={view}
      className="w-full flex-1 rounded-lg border"
      onValueChange={setView}
    >
      <div className="h-full overflow-auto flex flex-col p-4">
        <div className="flex flex-col justify-between items-center gap-y-2 lg:flex-row ">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger value="table" className="w-full h-8 lg:w-auto">
              Table
            </TabsTrigger>
            <TabsTrigger value="kanban" className="w-full h-8 lg:w-auto">
              Kanban
            </TabsTrigger>
            <TabsTrigger value="calender" className="w-full h-8 lg:w-auto">
              Calender
            </TabsTrigger>
          </TabsList>
          <Button
            size="sm"
            className="w-full lg:w-auto"
            onClick={() => setStatus(status ?? "true")}
          >
            <PlusIcon className="size-4 mr-2" />
            New
          </Button>
        </div>
        <DottedSeparated className="my-4" />
        <DataFilters hideProjectFilters={hideProjectFilters} />
        <DottedSeparated className="my-4" />
        {isLoadingTasks ? (
          <div className="w-full h-[200px] flex flex-col justify-center items-center rounded-lg border">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={TASK_COLUMNS} data={tasks?.documents ?? []} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              <DataKanban
                data={tasks?.documents ?? []}
                onChange={onKanbanChange}
              />
            </TabsContent>
            <TabsContent value="calender" className="mt-0">
              <DataCalendar data={tasks?.documents ?? []} />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};

export default TasksViewSwitcher;
