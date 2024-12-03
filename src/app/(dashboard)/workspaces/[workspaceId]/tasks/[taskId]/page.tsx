import Task from "@/features/tasks/components/task";

import { protectRoute } from "@/core/actions";

const TaskPage = async () => {
  await protectRoute("/sign-in", false);

  return <Task />;
};

export default TaskPage;
