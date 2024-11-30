"use client";

import { PlusIcon } from "lucide-react";

import { useCreateTaskModal } from "@/features/tasks/core/hooks";

import DottedSeparated from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TasksViewSwitcher = () => {
  const { open } = useCreateTaskModal();

  return (
    <Tabs className="w-full flex-1 rounded-lg border">
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
          <Button size="sm" className="w-full lg:w-auto" onClick={open}>
            <PlusIcon className="size-4 mr-2" />
            New
          </Button>
        </div>
        <DottedSeparated className="my-4" />
        Data filters
        <DottedSeparated className="my-4" />
        <>
          <TabsContent value="table" className="mt-0">
            Data table
          </TabsContent>
          <TabsContent value="kanban" className="mt-0">
            Data kanban
          </TabsContent>
          <TabsContent value="calender" className="mt-0">
            Data calender
          </TabsContent>
        </>
      </div>
    </Tabs>
  );
};

export default TasksViewSwitcher;
