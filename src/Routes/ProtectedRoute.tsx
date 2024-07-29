import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../componants/SharedComponants/Loader/Loader";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const authData = useAuth();

  if (authData?.loading) {
    return <Loader />;
  } else if (!authData?.user) {
    return <Navigate to={"/login"} state={location.pathname} />;
  }

  return children;
};

export default ProtectedRoute;
