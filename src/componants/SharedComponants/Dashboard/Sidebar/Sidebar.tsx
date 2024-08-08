import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext } from "react";
import Logo from "../../Logo/Logo";
import { Link } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { SidebarContext } from "../../../../layouts/DashboardLayout";

// type SidebarContextType = {
//   expanded: boolean;
// };

// export const SidebarContext = createContext<SidebarContextType | undefined>(
//   undefined
// );

export default function Sidebar({ children }: { children: React.ReactNode }) {
  // const [expanded, setExpanded] = useState<boolean>(true);
  const sidebarCon = useContext(SidebarContext);
  const authData = useAuth();
  return (
    <aside className="h-screen absolute top-0 left-0 z-10 md:static">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex items-center">
          {/* <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt="" */}
          {/* /> */}
          <Link
            to={"/"}
            className={`h-10 overflow-hidden transition-all flex-1 ${
              sidebarCon?.expanded ? "w-auto" : "w-0"
            }`}
          >
            <Logo />
          </Link>
          <button
            onClick={() => sidebarCon?.setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {sidebarCon?.expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* <SidebarContext.Provider value={{ expanded }}> */}
        <ul className="flex-1 px-3">{children}</ul>
        {/* </SidebarContext.Provider> */}

        {/* ------ Bottom user ---------*/}
        <div className="border-t flex p-3">
          <img
            src={
              authData?.user?.photoURL
                ? authData?.user?.photoURL
                : "https://img.icons8.com/?size=256w&id=7819&format=png&color=FA5252"
            }
            alt=""
            className="w-10 h-10 rounded-md"
          />

          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${
                sidebarCon?.expanded ? "w-52 ml-3" : "w-0"
              }
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{authData?.user?.displayName}</h4>
              <span className="text-xs text-gray-600">
                {authData?.user?.email}
              </span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}
