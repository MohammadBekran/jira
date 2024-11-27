import { protectRoute } from "@/core/actions";

const WorkSpacePage = async () => {
  await protectRoute("/sign-in", false);

  return <div>WorkSpacePage</div>;
};

export default WorkSpacePage;
