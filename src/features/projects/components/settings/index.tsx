import UpdateProjectForm from "@/features/projects/components/settings/update-project-form";
import type { TProject } from "@/features/projects/core/types";

const ProjectSettings = ({ project }: { project: TProject }) => {
  return (
    <div className="w-full lg:max-w-xl">
      <UpdateProjectForm initialValues={project} />
    </div>
  );
};

export default ProjectSettings;
