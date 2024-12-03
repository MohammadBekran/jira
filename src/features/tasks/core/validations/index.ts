import { z } from "zod";

import { ETaskStatus } from "@/features/tasks/core/enum";

const createTaskSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  status: z.nativeEnum(ETaskStatus, { required_error: "Required" }),
  workspaceId: z.string().trim().min(1, "Required"),
  projectId: z.string().trim().min(1, "Required"),
  dueDate: z.coerce.date(),
  assigneeId: z.string().trim().min(1, "Required"),
  description: z.string().optional(),
});

const updateTaskSchema = z.object({
  name: z.string().trim().min(1, "Must be 1 or more characters").optional(),
  status: z.nativeEnum(ETaskStatus, { required_error: "Required" }).optional(),
  workspaceId: z.string().trim().min(1, "Required").optional(),
  projectId: z.string().trim().min(1, "Required").optional(),
  dueDate: z.coerce.date().optional(),
  assigneeId: z.string().trim().min(1, "Must select an assignee").optional(),
  description: z.string().nullable().optional(),
});

export { createTaskSchema, updateTaskSchema };
