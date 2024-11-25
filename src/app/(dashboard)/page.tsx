import UserButton from "@/components/user-button";
import { protectRoute } from "@/core/actions";

const HomePage = async () => {
  await protectRoute("/sign-in", false);

  return <div>This is home page</div>;
};

export default HomePage;
