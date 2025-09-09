import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const useLoginForm = (setIsOpen) => {
  const navigate = useNavigate();
  const { login, error, setError } = useAuth();
  const [loading, setLoading] = useState(false);

  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(loginDetail.email, loginDetail.password);
      if (user) {
        if (user.role === "admin") {
          setIsOpen(false);
          navigate("/dashboard");
        } else {
          setIsOpen(false);
          navigate("/");
        }

        // setIsOpen(false);

        setLoginDetail({ email: "", password: "" });
      }
    } catch (error) {
      setError("Server error while logging in");
    } finally {
      setLoading(false);
    }
  };
  return { loginDetail, setLoginDetail, error, setError, handleLogin, loading };
};

export default useLoginForm;
