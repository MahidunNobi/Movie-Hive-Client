import { Outlet } from "react-router-dom";
import Sidebar from "../componants/SharedComponants/Dashboard/Sidebar/Sidebar";
import SidebarItem from "../componants/SharedComponants/Dashboard/Sidebar/SidebarItem";
import { BarChart3 } from "lucide-react";

const DashboardLayout = () => {
  return (
    <div>
      {/* <div className="shadow shadow-net-red/30 ">
        <Navbar />
      </div> */}
      <div className="flex">
        <Sidebar>
          <SidebarItem
            icon={<BarChart3 size={20} />}
            text="Statics"
            active
            alert
          />
        </Sidebar>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
