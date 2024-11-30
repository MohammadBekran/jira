import { ETaskStatus } from "@/features/tasks/core/enum";

export const TASK_STATUS_OPTIONS = [
  {
    value: ETaskStatus.BACKLOG,
    label: "Backlog",
  },
  {
    value: ETaskStatus.IN_PROGRESS,
    label: "In Progress",
  },
  {
    value: ETaskStatus.IN_REVIEW,
    label: "In Review",
  },
  {
    value: ETaskStatus.TODO,
    label: "Todo",
  },
  {
    value: ETaskStatus.DONE,
    label: "Done",
  },
] as const;
