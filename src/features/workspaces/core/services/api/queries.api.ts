import { useQuery } from "@tanstack/react-query";

import client from "@/lib/rpc";

const useGetWorkspaces = () => {
  const query = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const response = await client.api.workspaces.$get();

      if (!response.ok) throw new Error("Failed to fetch workspaces");

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};

const useGetWorkspaceAnalytics = ({ workspaceId }: { workspaceId: string }) => {
  const query = useQuery({
    queryKey: ["workspace-analytics"],
    queryFn: async () => {
      const response = await client.api.workspaces[":workspaceId"]["analytics"][
        "$get"
      ]({
        param: { workspaceId },
      });

      if (!response.ok) throw new Error("Failed to fetch workspace analytics");

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};

export { useGetWorkspaces, useGetWorkspaceAnalytics };
