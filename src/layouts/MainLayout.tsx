import { Outlet } from "react-router-dom";
import Navbar from "../componants/SharedComponants/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="min-w-[100vw] min-h-screen bg-net-black text-white relative">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
