import { redirect } from "next/navigation";

import ProjectSettings from "@/features/projects/components/settings";
import { getProject } from "@/features/projects/core/queries";

import { protectRoute } from "@/core/actions";

const ProjectSettingsPage = async ({
  params,
}: {
  params: { workspaceId: string; projectId: string };
}) => {
  await protectRoute("/sign-in", false);

  const project = await getProject({ projectId: params.projectId });

  if (!project)
    redirect(`/workspaces/${params.workspaceId}/projects/${params.projectId}`);

  return <ProjectSettings project={project} />;
};

export default ProjectSettingsPage;
