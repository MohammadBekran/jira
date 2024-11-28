import { getWorkspaces } from "@/features/workspaces/core/queries";

import { protectRoute } from "@/core/actions";
import { redirect } from "next/navigation";

const HomePage = async () => {
  await protectRoute("/sign-in", false);

  const workspaces = await getWorkspaces();

  if (workspaces.total === 0) redirect("/workspaces/create");
  else redirect(`/workspaces/${workspaces.documents[0].$id}`);
};

export default HomePage;
