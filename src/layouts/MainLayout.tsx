import { Outlet } from "react-router-dom";
import Navbar from "../componants/SharedComponants/Navbar/Navbar";
import Footer from "../componants/Home/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="min-w-[100vw] md:min-w-[98vw] min-h-screen bg-net-black text-white relative">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
