import Loader from "../componants/SharedComponants/Loader/Loader";
import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, role } = useRole();

  if (isLoading) return <Loader />;
  else if (role !== "ADMIN") return <Navigate to={"/dashboard"} />;
  return children;
};

export default AdminRoute;
