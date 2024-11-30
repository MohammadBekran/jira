import { Hono } from "hono";
import { handle } from "hono/vercel";

import auth from "@/features/auth/core/server/route";
import members from "@/features/members/core/server/route";
import projects from "@/features/projects/core/server/route";
import tasks from "@/features/tasks/core/server/route";
import workspaces from "@/features/workspaces/core/server/route";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/auth", auth)
  .route("/workspaces", workspaces)
  .route("/members", members)
  .route("/projects", projects)
  .route("/tasks", tasks);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type TAppType = typeof routes;
