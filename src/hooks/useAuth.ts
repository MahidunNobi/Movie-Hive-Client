import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const authContextData = useContext(AuthContext);
  if (!authContextData) {
    return;
  }
  return { ...authContextData };
};

export default useAuth;
