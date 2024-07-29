import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const authData = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["user-role", authData?.user],
    enabled: !authData?.loading && !!authData?.user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${authData?.user?.email}`);
      return res.data;
    },
  });

  return { isLoading, role: userData.role };
};

export default useRole;
