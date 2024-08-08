import { Outlet } from "react-router-dom";
import Sidebar from "../componants/SharedComponants/Dashboard/Sidebar/Sidebar";
import SidebarItem from "../componants/SharedComponants/Dashboard/Sidebar/SidebarItem";
import { CirclePlus, Kanban, SquareKanban } from "lucide-react";
import useRole from "../hooks/useRole";
import { createContext, SetStateAction, useState } from "react";

type SidebarContextType = {
  expanded: boolean;
  setExpanded: React.Dispatch<SetStateAction<boolean>>;
};

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);

const DashboardLayout = () => {
  const { role } = useRole();
  const [expanded, setExpanded] = useState<boolean>(true);

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
  const AdminNavigation = [
    {
      path: "manage-featured",
      icon: <SquareKanban size={20} />,
      text: "Manage Featured",
    },
  ];

  return (
    <div data-theme="">
      <SidebarContext.Provider value={{ expanded, setExpanded }}>
        <div className="flex relative">
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
            {role === "ADMIN" && (
              <>
                <div className="divider font-ubuntu text-gray-500">
                  {expanded && "Admin"}
                </div>

                {AdminNavigation.map((nav, i) => (
                  <SidebarItem
                    key={i}
                    path={nav.path}
                    icon={nav.icon}
                    text={nav.text}
                  />
                ))}
              </>
            )}
          </Sidebar>
          <div className="flex-1 pl-20 md:pl-6 p-6 max-h-screen overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </SidebarContext.Provider>
    </div>
  );
};

export default DashboardLayout;
