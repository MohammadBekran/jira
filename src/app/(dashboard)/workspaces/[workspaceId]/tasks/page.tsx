import TasksViewSwitcher from "@/features/tasks/components/tasks-view-switcher";

import { protectRoute } from "@/core/actions";

const TasksPage = async () => {
  await protectRoute("/sign-in", false);

  return (
    <div className="h-full flex flex-col">
      <TasksViewSwitcher />
    </div>
  );
};

export default TasksPage;
