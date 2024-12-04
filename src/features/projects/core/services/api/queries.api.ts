import { useQuery } from "@tanstack/react-query";

import client from "@/lib/rpc";

const useGetProjects = ({ workspaceId }: { workspaceId: string }) => {
  const query = useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: async () => {
      const response = await client.api.projects.$get({
        query: { workspaceId },
      });

      if (!response.ok) throw new Error("Failed to fetch projects");

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};

const useGetProjectAnalytics = ({ projectId }: { projectId: string }) => {
  const query = useQuery({
    queryKey: ["project-analytics"],
    queryFn: async () => {
      const response = await client.api.projects[":projectId"]["analytics"][
        "$get"
      ]({
        param: { projectId },
      });

      if (!response.ok) throw new Error("Failed to fetch project analytics");

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};

export { useGetProjects, useGetProjectAnalytics };
