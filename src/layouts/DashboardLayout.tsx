import { Outlet } from "react-router-dom";
import Sidebar from "../componants/SharedComponants/Dashboard/Sidebar/Sidebar";
import SidebarItem from "../componants/SharedComponants/Dashboard/Sidebar/SidebarItem";
import { CirclePlus, Kanban } from "lucide-react";

const DashboardLayout = () => {
  const navigations = [
    {
      path: "add-movie",
      icon: <CirclePlus size={20} />,
      text: "Add Movie",
    },
    {
      path: "manage-movie",
      icon: <Kanban size={20} />,
      text: "Manage Movie",
    },
  ];

  return (
    <div>
      <div className="flex">
        <Sidebar>
          {/* <SidebarItem
            icon={<BarChart3 size={20} />}
            text="Statics"
            active
            alert
          /> */}
          {navigations.map((nav, i) => (
            <SidebarItem
              key={i}
              path={nav.path}
              icon={nav.icon}
              text={nav.text}
            />
          ))}
        </Sidebar>
        <div className="flex-1 pl-20 md:pl-6 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
