import { useState } from "react";
import Navbar from "../HomeComponents/Navbar";
import useNavAuth from "../../hooks/useNavAuth";
import {
  ArrowLeftFromLine,
  Gauge,
  MessageSquareDot,
  Notebook,
  Pencil,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const SideMenu = () => {
  const { handleLogout } = useNavAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const navOptions = [
    { logo: <Gauge size={17} />, text: "Dashboard", path: "/dashboard" },
    { logo: <Pencil size={17} />, text: "Create Post", path: "/create-post" },
    { logo: <Notebook size={17} />, text: "All Posts", path: "/all-posts" },
    {
      logo: <MessageSquareDot size={17} />,
      text: "Comments",
      path: "/comments",
    },
  ];
  const navigate = useNavigate();

  return (
    <>
      <div className="relative">
        <div className="border-r border-border absolute top-0 -left-5 p-3 h-[90vh]  lg:px-1 lg:py-5  lg:w-[170px]">
          <div className="flex flex-col gap-8 ">
            {navOptions.map((navOpt, i) => (
              <div
                className={`lg:flex gap-2 w-[40px] lg:w-[130px] items-center px-3 py-2 rounded-xl border-b
                   border-border transition-all  cursor-pointer  ${
                     currentPath === navOpt.path
                       ? "bg-primary text-white font-semibold"
                       : "bg-secondary text-secondary-foreground"
                   } `}
                key={i}
                onClick={() => {
                  navigate(`/${navOpt.text.toLowerCase().replace(" ", "-")}`);
                }}
              >
                {navOpt.logo}{" "}
                <p className="hidden lg:block text-sm">{navOpt.text}</p>
              </div>
            ))}
            <button
              className="lg:flex gap-2 w-[40px] lg:w-[130px] items-center px-3 py-2 rounded-xl
                border-border transition-all  cursor-pointer bg-primary text-white font-semibold"
              onClick={handleLogout}
            >
              <ArrowLeftFromLine size={17} />
              <p className="hidden lg:block text-sm">Logout</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
