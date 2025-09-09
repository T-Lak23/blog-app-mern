import { ArrowRightToLine, CircleX, Lock, Mail, User } from "lucide-react";
import useRegisterForm from "../../hooks/useRegisterForm";
import Input from "./Input";
import { Link } from "react-router-dom";

const Register = ({ registerOpen, setRegisterOpen, setIsOpen }) => {
  const {
    setRegisterDetail,
    registerDetail,
    handleRegister,
    loading,
    error,
    setError,
  } = useRegisterForm(setRegisterOpen);
  return (
    registerOpen && (
      <div className="fixed inset-0 z-50 bg-gray-900/70 flex px-3  justify-center items-center backdrop-blur-sm">
        <div className="max-w-md p-6 sm:text-md text-sm bg-white shadow-lg w-full rounded-2xl relative">
          <button
            onClick={() => setRegisterOpen(false)}
            className="absolute top-10 right-4 cursor-pointer"
          >
            <CircleX />
          </button>
          <h2 className="mt-4 mb-7 text-start font-semibold text-xl">
            Register into Chronicle
          </h2>
          <form onSubmit={handleRegister}>
            <div className="w-full flex flex-col gap-2">
              <Input
                id={"name"}
                type={"text"}
                placeholder={"john"}
                logo={<User size={18} />}
                label={"Full Name"}
                value={registerDetail.name}
                onChange={(e) => {
                  setError("");
                  setRegisterDetail((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
              />
              <Input
                id={"email"}
                type={"email"}
                placeholder={"you@example.com"}
                logo={<Mail size={18} />}
                label={"Email"}
                value={registerDetail.email}
                onChange={(e) => {
                  setError("");
                  setRegisterDetail((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
              />

              <Input
                id={"password"}
                type={"password"}
                placeholder={"*********"}
                logo={<Lock size={18} />}
                label={"Password"}
                value={registerDetail.password}
                onChange={(e) => {
                  setError("");
                  setRegisterDetail((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
              />

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className={`flex items-center justify-center my-5 bg-primary flex-1 py-2
             gap-2 text-white font-semibold rounded-xl cursor-pointer ${
               loading ? "opacity-50 cursor-not-allowed" : ""
             }`}
              >
                <ArrowRightToLine size={18} /> Sign up
              </button>
            </div>
          </form>
          <p className="text-center">
            Already have an account?{" "}
            <Link
              onClick={() => {
                setRegisterOpen(false);
                setIsOpen(true);
              }}
              className="text-primary font-semibold hover:underline hover:underline-offset-5 transition-all"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    )
  );
};

export default Register;
