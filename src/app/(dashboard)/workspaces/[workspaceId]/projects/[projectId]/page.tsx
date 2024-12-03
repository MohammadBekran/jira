import type { Metadata } from "next";

import Project from "@/features/projects/components/project";
import { getProject } from "@/features/projects/core/queries";

import { protectRoute } from "@/core/actions";

interface IProjectPageProps {
  params: Promise<{ projectId: string }>;
}

const ProjectPage = async ({ params }: IProjectPageProps) => {
  await protectRoute("/sign-in", false);

  const { projectId } = await params;

  const project = await getProject({ projectId });

  if (!project) throw new Error("Project not found.");

  return <Project project={project} />;
};

export const generateMetadata = async ({
  params,
}: IProjectPageProps): Promise<Metadata> => {
  const { projectId } = await params;

  const project = await getProject({ projectId });

  return {
    title: project.name,
    description: `manage all of the tasks of "${project.name}" project`,
  };
};

export default ProjectPage;
