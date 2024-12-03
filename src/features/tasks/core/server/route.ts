import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { z } from "zod";

import type { TMember } from "@/features/members/core/types";
import { getMember } from "@/features/members/core/utils";
import type { TProject } from "@/features/projects/core/types";
import { ETaskStatus } from "@/features/tasks/core/enum";
import type { TTask } from "@/features/tasks/core/types";

import {
  createTaskSchema,
  updateTaskSchema,
} from "@/features/tasks/core/validations";

import { DATABASE_ID, MEMBERS_ID, PROJECTS_ID, TASKS_ID } from "@/core/configs";
import { createAdminClient } from "@/lib/appwrite";
import sessionMiddleware from "@/lib/session-middleware";

const app = new Hono()
  .get(
    "/",
    sessionMiddleware,
    zValidator(
      "query",
      z.object({
        workspaceId: z.string(),
        projectId: z.string().nullish(),
        assigneeId: z.string().nullish(),
        status: z.nativeEnum(ETaskStatus).nullish(),
        search: z.string().nullish(),
        dueDate: z.string().nullish(),
      })
    ),
    async (c) => {
      const { users } = await createAdminClient();
      const databases = c.get("databases");
      const user = c.get("user");

      const { workspaceId, projectId, assigneeId, status, search, dueDate } =
        c.req.valid("query");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) return c.json({ error: "Unauthorized" }, 401);

      const query = [
        Query.equal("workspaceId", workspaceId),
        Query.orderDesc("$createdAt"),
      ];
      if (projectId) query.push(Query.equal("projectId", projectId));
      if (status) query.push(Query.equal("status", status));
      if (assigneeId) query.push(Query.equal("assigneeId", assigneeId));
      if (dueDate) query.push(Query.equal("dueDate", dueDate));
      if (search) query.push(Query.equal("name", search));

      const tasks = await databases.listDocuments<TTask>(
        DATABASE_ID,
        TASKS_ID,
        query
      );
      const projectIds = tasks.documents.map((task) => task.projectId);
      const assigneeIds = tasks.documents.map((task) => task.assigneeId);

      const projects = await databases.listDocuments<TProject>(
        DATABASE_ID,
        PROJECTS_ID,
        projectIds.length > 0 ? [Query.contains("$id", projectIds)] : []
      );

      const members = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        assigneeIds.length > 0 ? [Query.contains("$id", assigneeIds)] : []
      );

      const assignees = await Promise.all(
        members.documents.map(async (member) => {
          const user = await users.get(member.userId);

          return {
            ...member,
            name: user.name || user.email,
            email: user.email,
          };
        })
      );

      const populatedTasks = tasks.documents.map((task) => {
        const project = projects.documents.find(
          (project) => project.$id === task.projectId
        );
        const assignee = assignees.find(
          (assignee) => assignee?.$id === task.assigneeId
        );

        return {
          ...task,
          project,
          assignee,
        };
      });

      return c.json({
        data: {
          ...tasks,
          documents: populatedTasks,
        },
      });
    }
  )
  .get("/:taskId", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const currentUser = c.get("user");
    const { users } = await createAdminClient();

    const { taskId } = c.req.param();

    const task = await databases.getDocument<TTask>(
      DATABASE_ID,
      TASKS_ID,
      taskId
    );
    if (!task) return c.json({ error: "Invalid task" }, 404);

    const currentMember = await getMember({
      databases,
      workspaceId: task.workspaceId,
      userId: currentUser.$id,
    });
    if (!currentMember) return c.json({ error: "Unauthorized" }, 401);

    const project = await databases.getDocument<TProject>(
      DATABASE_ID,
      PROJECTS_ID,
      task.projectId
    );

    const member = await databases.getDocument<TMember>(
      DATABASE_ID,
      MEMBERS_ID,
      task.assigneeId
    );

    const user = await users.get(member.userId);

    const assignee = {
      data: {
        ...member,
        name: user.name || user.email,
        email: user.email,
      },
    };

    const dataToReturn = {
      ...task,
      project,
      assignee,
    };

    return c.json({ data: dataToReturn });
  })
  .post(
    "/",
    sessionMiddleware,
    zValidator("json", createTaskSchema),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");

      const {
        name,
        status,
        description,
        workspaceId,
        projectId,
        dueDate,
        assigneeId,
      } = c.req.valid("json");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) return c.json({ error: "Unauthorized" }, 401);

      const highestPositionTask = await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.equal("status", status),
          Query.equal("workspaceId", workspaceId),
          Query.orderAsc("position"),
          Query.limit(1),
        ]
      );

      const newPosition =
        highestPositionTask.documents.length > 0
          ? highestPositionTask.documents[0].position + 1000
          : 1000;

      const task = await databases.createDocument(
        DATABASE_ID,
        TASKS_ID,
        ID.unique(),
        {
          name,
          status,
          workspaceId,
          projectId,
          dueDate,
          assigneeId,
          description,
          position: newPosition,
        }
      );

      return c.json({ data: task });
    }
  )
  .patch(
    "/:taskId",
    sessionMiddleware,
    zValidator("json", updateTaskSchema),
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");

      const {
        name,
        status,
        description,
        workspaceId,
        projectId,
        dueDate,
        assigneeId,
      } = c.req.valid("json");
      const { taskId } = c.req.param();

      const task = await databases.getDocument(DATABASE_ID, TASKS_ID, taskId);
      if (!task) return c.json({ error: "Invalid task" }, 404);

      const member = await getMember({
        databases,
        workspaceId: task.workspaceId,
        userId: user.$id,
      });
      if (!member) return c.json({ error: "Unauthorized" }, 400);

      const updatedTask = await databases.updateDocument(
        DATABASE_ID,
        TASKS_ID,
        task.$id,
        {
          name,
          status,
          description,
          workspaceId,
          projectId,
          dueDate,
          assigneeId,
        }
      );

      return c.json({ data: updatedTask });
    }
  )
  .delete("/:taskId", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const { taskId } = c.req.param();

    const task = await databases.getDocument(DATABASE_ID, TASKS_ID, taskId);

    if (!task) return c.json({ error: "Invalid task" }, 400);

    const member = await getMember({
      databases,
      workspaceId: task.workspaceId,
      userId: user.$id,
    });
    if (!member) return c.json({ error: "Unauthorized" }, 401);

    await databases.deleteDocument(DATABASE_ID, TASKS_ID, task.$id);

    return c.json({ data: { $id: task.$id } });
  })
  .post(
    "/bulk-update",
    sessionMiddleware,
    zValidator(
      "json",
      z.object({
        tasks: z.array(
          z.object({
            $id: z.string(),
            status: z.nativeEnum(ETaskStatus),
            position: z.number().int().positive().min(1000).max(1_000_000),
          })
        ),
      })
    ),
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");

      const { tasks } = c.req.valid("json");

      const taskIds = tasks.map((task) => task.$id);

      const tasksToUpdate = await databases.listDocuments<TTask>(
        DATABASE_ID,
        TASKS_ID,
        [Query.contains("$id", taskIds)]
      );

      const workspaceIds = new Set(
        tasksToUpdate.documents.map((task) => task.workspaceId)
      );
      if (workspaceIds.size !== 1)
        return c.json(
          { error: "All tasks must being to the same workspace" },
          400
        );

      const workspaceId = workspaceIds.values().next().value;

      if (!workspaceId)
        return c.json({ error: "workspaceId is required" }, 400);

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) return c.json({ error: "Unauthorized" }, 401);

      const updatedTask = await Promise.all(
        tasks.map(async (task) => {
          const { $id, status, position } = task;
          return databases.updateDocument<TTask>(DATABASE_ID, TASKS_ID, $id, {
            status,
            position,
          });
        })
      );

      return c.json({ data: updatedTask });
    }
  );

export default app;
