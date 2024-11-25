import UserButton from "@/components/user-button";
import { protectRoute } from "@/core/actions";

const HomePage = async () => {
  await protectRoute("/sign-in", false);

  return (
    <div>
      <UserButton />
    </div>
  );
};

export default HomePage;
