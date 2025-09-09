import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/HomeComponents/Navbar";
import SideMenu from "../components/AdminComponents/SideMenu";

const AdminLayout = ({ hideButton, setHideButton }) => {
  const location = useLocation();

  return (
    <>
      <Navbar hideButton={hideButton} setHideButton={setHideButton} />
      <SideMenu />
      <main
        className="relative left-[8%] sm:left-[7%] md:left-[8%]  lg:left-[9.5%] xl:left-[8%]  max-w-[80%] my-5 mx-auto"
        key={location.pathname}
      >
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
