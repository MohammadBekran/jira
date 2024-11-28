import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { z } from "zod";

import MemberRole from "@/features/members/core/enum/member-role.enum";
import { getMember } from "@/features/members/core/utils";
import type { TProject } from "@/features/projects/core/types";
import {
  createProjectSchema,
  updateProjectSchema,
} from "@/features/projects/core/validations";

import { DATABASE_ID, IMAGES_BUCKET_ID, PROJECTS_ID } from "@/core/configs";
import sessionMiddleware from "@/lib/session-middleware";

const app = new Hono()
  .post(
    "/",
    zValidator("form", createProjectSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");

      const { name, image, workspaceId } = c.req.valid("form");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) return c.json({ error: "Unauthorized " }, 401);

      let uploadedImageUrl: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image
        );

        const arrayBuffer = await storage.getFilePreview(
          IMAGES_BUCKET_ID,
          file.$id
        );

        uploadedImageUrl = `data:image/png;base64,${Buffer.from(
          arrayBuffer
        ).toString("base64")}`;
      }

      const project = await databases.createDocument(
        DATABASE_ID,
        PROJECTS_ID,
        ID.unique(),
        {
          workspaceId,
          name,
          imageUrl: uploadedImageUrl,
        }
      );

      return c.json({ data: project });
    }
  )
  .get(
    "/",
    sessionMiddleware,
    zValidator("query", z.object({ workspaceId: z.string() })),
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");

      const { workspaceId } = c.req.valid("query");

      if (!workspaceId) return c.json({ error: "Missing workspaceId" }, 400);

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) return c.json({ error: "Unauthorized" }, 401);

      const projects = await databases.listDocuments(DATABASE_ID, PROJECTS_ID, [
        Query.equal("workspaceId", workspaceId),
        Query.orderDesc("$createdAt"),
      ]);

      return c.json({ data: projects });
    }
  )
  .get("/:projectId", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const { projectId } = c.req.param();

    if (!projectId) return c.json({ error: "Missing projectId" }, 400);

    const project = await databases.getDocument(
      DATABASE_ID,
      PROJECTS_ID,
      projectId
    );

    const member = await getMember({
      databases,
      workspaceId: project.workspaceId,
      userId: user.$id,
    });

    if (!member) return c.json({ error: "Unauthorized" }, 401);

    return c.json({ data: project });
  })
  .patch(
    "/:projectId",
    zValidator("form", updateProjectSchema),
    zValidator("param", z.object({ projectId: z.string() })),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");

      const { projectId } = c.req.valid("param");
      const { name, image } = c.req.valid("form");

      if (!projectId) c.json({ error: "Missing projectId" }, 400);

      const existingProject = await databases.getDocument<TProject>(
        DATABASE_ID,
        PROJECTS_ID,
        projectId
      );

      if (!existingProject) c.json({ error: "Invalid project" }, 404);

      const member = await getMember({
        databases,
        workspaceId: existingProject.workspaceId,
        userId: user.$id,
      });

      if (!member || member.role !== MemberRole.ADMIN) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      let uploadedImageUrl: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image
        );

        const arrayBuffer = await storage.getFilePreview(
          IMAGES_BUCKET_ID,
          file.$id
        );

        uploadedImageUrl = `data:image/png;base64,${Buffer.from(
          arrayBuffer
        ).toString("base64")}`;
      } else uploadedImageUrl = image;

      const project = await databases.getDocument(
        DATABASE_ID,
        PROJECTS_ID,
        projectId
      );

      if (!project) return c.json({ error: "Project not found" }, 404);

      const updatedProject = await databases.updateDocument(
        DATABASE_ID,
        PROJECTS_ID,
        project.$id,
        {
          name,
          imageUrl: uploadedImageUrl,
        }
      );

      return c.json({ data: updatedProject });
    }
  )
  .delete("/:projectId", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const { projectId } = c.req.param();

    if (!projectId) c.json({ error: "Missing projectId" }, 400);

    const existingProject = await databases.getDocument<TProject>(
      DATABASE_ID,
      PROJECTS_ID,
      projectId
    );

    if (!existingProject) c.json({ error: "Invalid project" }, 404);

    const member = await getMember({
      databases,
      workspaceId: existingProject.workspaceId,
      userId: user.$id,
    });

    if (!member) return c.json({ error: "Unauthorized" }, 401);

    const project = await databases.getDocument(
      DATABASE_ID,
      PROJECTS_ID,
      projectId
    );

    if (!project) return c.json({ error: "Invalid project" }, 404);

    // TODO: Delete tasks

    await databases.deleteDocument(DATABASE_ID, PROJECTS_ID, project.$id);

    return c.json({ data: { $id: project.$id } });
  });

export default app;
