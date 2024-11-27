import { z } from "zod";

import { createWorkspaceSchema } from "@/features/workspaces/core/validations";

type TCreateWorkspaceFormData = z.infer<typeof createWorkspaceSchema>;

export type { TCreateWorkspaceFormData };
