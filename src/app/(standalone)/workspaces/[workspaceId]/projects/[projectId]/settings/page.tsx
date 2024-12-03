import type { Metadata } from "next";
import { redirect } from "next/navigation";

import ProjectSettings from "@/features/projects/components/settings";
import { getProject } from "@/features/projects/core/queries";

import { protectRoute } from "@/core/actions";

interface IProjectSettingsPageProps {
  params: Promise<{ workspaceId: string; projectId: string }>;
}

const ProjectSettingsPage = async ({ params }: IProjectSettingsPageProps) => {
  await protectRoute("/sign-in", false);

  const { workspaceId, projectId } = await params;

  const project = await getProject({ projectId });

  if (!project) redirect(`/workspaces/${workspaceId}/projects/${projectId}`);

  return <ProjectSettings project={project} />;
};

export const generateMetadata = async ({
  params,
}: IProjectSettingsPageProps): Promise<Metadata> => {
  const { projectId } = await params;

  const project = await getProject({ projectId });

  return {
    title: `Project settings: ${project.name}`,
    description: `update the settings of "${project.name}" project`,
  };
};

export default ProjectSettingsPage;
