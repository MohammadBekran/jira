import Project from "@/features/projects/components/project";
import { getProject } from "@/features/projects/core/queries";

import { protectRoute } from "@/core/actions";

const ProjectPage = async ({ params }: { params: { projectId: string } }) => {
  await protectRoute("/sign-in", false);

  const project = await getProject({ projectId: params.projectId });

  if (!project) throw new Error("Project not found.");

  return <Project project={project} />;
};

export default ProjectPage;
