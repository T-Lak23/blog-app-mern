import { ArrowRightToLine, NotebookPen } from "lucide-react";
import { useState } from "react";
import Login from "../AuthComponents/Login";
import NavButton from "./NavButton";
import useNavAuth from "../../hooks/useNavAuth";
import Register from "../AuthComponents/Register";
import { useNavigate } from "react-router-dom";
const Navbar = ({ hideButton, setHideButton }) => {
  const { user, isAuthenticated, handleLogout, handleDashboard } = useNavAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between pb-4 border-border border-b-1">
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <NotebookPen size={22} />
          <p className=" text-xl sm:text-2xl  font-bold">Chronicle</p>
        </div>
        <nav>
          {user && user?.role === "admin" ? (
            <div className="flex items-center gap-6">
              <p className="text-muted-foreground sm:block hidden  font-semibold text-lg">
                {user?.role === "admin" && user?.name}
              </p>
              {hideButton ? (
                ""
              ) : (
                <NavButton
                  label={"Dashboard"}
                  icon={<ArrowRightToLine size={18} />}
                  onClick={handleDashboard}
                />
              )}
            </div>
          ) : (
            user &&
            user?.role === "user" && (
              //   <button
              //     onClick={handleLogout}
              //     className="flex items-center bg-primary text-white rounded-xl px-3 py-2.5 text-sm sm:px-4 sm:text-md sm:py-3 gap-1 cursor-pointer"
              //   >
              //     <ArrowRightToLine size={20} />
              //     Logout
              //   </button>

              <div className="flex items-center gap-7">
                <p className="text-muted-foreground font-semibold">
                  {user?.name}
                </p>
                <NavButton
                  label={"Logout"}
                  icon={<ArrowRightToLine size={20} />}
                  onClick={handleLogout}
                />
              </div>
            )
          )}

          {(!isAuthenticated || !user) && (
            // <button
            //   onClick={() => setIsOpen(true)}
            //   className="flex items-center bg-primary text-white rounded-xl px-3 py-2.5 text-sm sm:px-4 sm:text-md sm:py-3 gap-1 cursor-pointer"
            // >
            //   <ArrowRightToLine size={20} />
            //   Login
            // </button>

            <NavButton
              label={"Login"}
              icon={<ArrowRightToLine size={20} />}
              onClick={() => setIsOpen(true)}
            />
          )}
        </nav>
      </div>
      <Login
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setRegisterOpen={setRegisterOpen}
      />
      <Register
        registerOpen={registerOpen}
        setRegisterOpen={setRegisterOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default Navbar;
