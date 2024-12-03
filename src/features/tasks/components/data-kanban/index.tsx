import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useCallback, useEffect, useState } from "react";

import KanbanCard from "@/features/tasks/components/data-kanban/kanban-card";
import KanbanColumnHeader from "@/features/tasks/components/data-kanban/kanban-column-header";
import { ETaskStatus } from "@/features/tasks/core/enum";
import type {
  TTask,
  TUpdateBulkOnchangeTask,
} from "@/features/tasks/core/types";

const boards: ETaskStatus[] = [
  ETaskStatus.BACKLOG,
  ETaskStatus.TODO,
  ETaskStatus.IN_PROGRESS,
  ETaskStatus.IN_REVIEW,
  ETaskStatus.DONE,
];

type TTasksState = {
  [key in ETaskStatus]: TTask[];
};

interface IDataKanbanProps {
  data: TTask[];
  onChange: (tasks: TUpdateBulkOnchangeTask) => void;
}

const DataKanban = ({ data, onChange }: IDataKanbanProps) => {
  const [tasks, setTasks] = useState(() => {
    const initialTasks: TTasksState = {
      [ETaskStatus.BACKLOG]: [],
      [ETaskStatus.TODO]: [],
      [ETaskStatus.IN_PROGRESS]: [],
      [ETaskStatus.IN_REVIEW]: [],
      [ETaskStatus.DONE]: [],
    };

    data.forEach((task) => {
      initialTasks[task.status as ETaskStatus].push(task);
    });

    Object.keys(initialTasks).forEach((status) => {
      initialTasks[status as ETaskStatus].sort(
        (a, b) => a.position - b.position
      );
    });

    return initialTasks;
  });

  useEffect(() => {
    const newTasks: TTasksState = {
      [ETaskStatus.BACKLOG]: [],
      [ETaskStatus.TODO]: [],
      [ETaskStatus.IN_PROGRESS]: [],
      [ETaskStatus.IN_REVIEW]: [],
      [ETaskStatus.DONE]: [],
    };

    data.forEach((task) => {
      newTasks[task.status].push(task);
    });

    Object.keys(newTasks).forEach((status) => {
      newTasks[status as ETaskStatus].sort((a, b) => a.position - b.position);
    });

    setTasks(newTasks);
  }, [data]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;

      if (!destination) return;

      const sourceStatus = source.droppableId as ETaskStatus;
      const destinationStatus = destination.droppableId as ETaskStatus;

      const calculatedPosition = (index: number) =>
        Math.min((index + 1) * 1000, 1_000_000);

      if (sourceStatus === destinationStatus) {
        const renderedTasks = [...tasks[sourceStatus]];
        const [movedTask] = renderedTasks.splice(source.index, 1);
        renderedTasks.splice(destination.index, 0, movedTask);

        setTasks((prev) => ({
          ...prev,
          [sourceStatus]: renderedTasks,
        }));

        const finalValues = renderedTasks.map((task, index) => ({
          $id: task.$id,
          status: sourceStatus,
          position: calculatedPosition(index),
        }));

        onChange(finalValues);

        return;
      }

      // If moved to a different board
      const sourceTasks = [...tasks[sourceStatus]];
      const destinationTasks = [...tasks[destinationStatus]];

      const [movedTask] = sourceTasks.splice(source.index, 1);
      movedTask.status = destinationStatus;
      destinationTasks.splice(destination.index, 0, movedTask);

      setTasks((prev) => ({
        ...prev,
        [sourceStatus]: sourceTasks,
        [destinationStatus]: destinationTasks,
      }));

      const finalValues = [
        ...sourceTasks.map((task, index) => ({
          $id: task.$id,
          status: sourceStatus,
          position: calculatedPosition(index),
        })),
        ...destinationTasks.map((task, index) => ({
          $id: task.$id,
          status: destinationStatus,
          position: calculatedPosition(index),
        })),
      ];

      onChange(finalValues);
    },
    [onChange, tasks]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="overflow-x-auto flex">
        {boards.map((board) => (
          <div
            key={board}
            className="min-w-[200px] flex-1 rounded-md p-1.5 mx-2 bg-muted"
          >
            <KanbanColumnHeader board={board} taskCount={tasks[board].length} />
            <Droppable droppableId={board}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-h-[200px]"
                >
                  {tasks[board].map((task, index) => (
                    <Draggable
                      key={task.$id}
                      draggableId={task.$id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <KanbanCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default DataKanban;
