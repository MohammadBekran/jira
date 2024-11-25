import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <div className="size-full flex">
        <div className="h-full fixed left-0 top-0 overflow-y-hidden hidden lg:block lg:w-[264px]">
          <Sidebar />
        </div>
        <div className="w-full lg:pl-[264px]">
          <div className="max-w-screen-2xl h-full mx-auto">
            <Navbar />
            <main className="h-full flex flex-col py-8 px-6">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
