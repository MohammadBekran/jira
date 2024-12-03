import { Models } from "node-appwrite";
import { z } from "zod";

import { ETaskStatus } from "@/features/tasks/core/enum";
import { createTaskSchema } from "@/features/tasks/core/validations";

type TTask = Models.Document & {
  name: string;
  workspaceId: string;
  projectId: string;
  position: number;
  imageUrl: string;
  dueDate: string;
  status: ETaskStatus;
  description?: string;
};
type TCreateTaskFormData = z.infer<typeof createTaskSchema>;
type TUpdateTaskFormData = z.infer<typeof createTaskSchema>;
type TUpdateBulkOnchangeTask = {
  $id: string;
  status: ETaskStatus;
  position: number;
}[];
type TCalendarActions = "PREV" | "NEXT" | "TODAY";

export type {
  TTask,
  TCreateTaskFormData,
  TUpdateTaskFormData,
  TUpdateBulkOnchangeTask,
  TCalendarActions,
};
