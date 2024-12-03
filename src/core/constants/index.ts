import { SettingsIcon, UsersIcon } from "lucide-react";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";

import type { TProjectAnalyticsResponseType } from "@/features/projects/core/types";

const NAVIGATION_ROUTES = [
  {
    label: "Home",
    href: "",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "My Tasks",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: "Members",
    href: "/members",
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
] as const;

const NAVIGATION_PAGE_INFORMATION = [
  {
    path: "/tasks",
    title: "Tasks",
    description: "View all of your tasks here",
  },
  {
    path: "/projects",
    title: "My Project",
    description: "View tasks of your project here",
  },
  {
    path: "",
    title: "Home",
    description: "Monitor all of your projects and tasks here",
  },
] as const;

const ANALYTICS_ITEMS = ({ data }: TProjectAnalyticsResponseType) =>
  [
    {
      title: "Total tasks",
      value: data?.taskDifference,
      variant: data?.assignedTaskDifference > 0 ? "up" : "down",
      increaseValue: data?.assignedTaskDifference,
    },
    {
      title: "Assigned tasks",
      value: data?.assignedTaskCount,
      variant: data?.assignedTaskDifference > 0 ? "up" : "down",
      increaseValue: data?.assignedTaskDifference,
    },
    {
      title: "Completed tasks",
      value: data?.completedTaskCount,
      variant: data?.completedTaskCount > 0 ? "up" : "down",
      increaseValue: data?.completeTaskDifference,
    },
    {
      title: "Overdue tasks",
      value: data?.overdueTaskCount,
      variant: data?.overdueTaskDifference > 0 ? "up" : "down",
      increaseValue: data?.overdueTaskDifference,
    },
    {
      title: "Incomplete tasks",
      value: data?.incompleteTaskCount,
      variant: data?.incompleteTaskDifference > 0 ? "up" : "down",
      increaseValue: data?.incompleteTaskDifference,
    },
  ] as const;

export { ANALYTICS_ITEMS, NAVIGATION_PAGE_INFORMATION, NAVIGATION_ROUTES };
