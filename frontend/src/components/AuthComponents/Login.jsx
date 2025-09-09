import { ArrowRightToLine, CircleX, Lock, Mail } from "lucide-react";
import Input from "./Input";
import { Link } from "react-router-dom";
import useLoginForm from "../../hooks/useLoginForm";

const Login = ({ isOpen, setIsOpen, setRegisterOpen }) => {
  const { loginDetail, setLoginDetail, handleLogin, loading, error, setError } =
    useLoginForm(setIsOpen);

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 bg-gray-900/70 flex px-3  justify-center items-center backdrop-blur-sm">
        <div className="max-w-md p-6 sm:text-md text-sm bg-white shadow-lg w-full rounded-2xl relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-10 right-4 cursor-pointer"
          >
            <CircleX />
          </button>
          <h2 className="mt-4 mb-7 text-start font-semibold text-xl">
            Log into Chronicle
          </h2>
          <form onSubmit={handleLogin}>
            <div className="w-full flex flex-col gap-2">
              <Input
                id={"email"}
                type={"email"}
                placeholder={"you@example.com"}
                logo={<Mail size={18} />}
                label={"Email"}
                value={loginDetail.email}
                onChange={(e) => {
                  setError("");
                  setLoginDetail((prev) => ({
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
                value={loginDetail.password}
                onChange={(e) => {
                  setError("");
                  setLoginDetail((prev) => ({
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
                <ArrowRightToLine size={18} /> Login
              </button>
            </div>
          </form>
          <p className="text-center">
            No account?{" "}
            <Link
              onClick={() => {
                setIsOpen(false);
                setRegisterOpen(true);
              }}
              className="text-primary font-semibold hover:underline hover:underline-offset-5 transition-all"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    )
  );
};

export default Login;
