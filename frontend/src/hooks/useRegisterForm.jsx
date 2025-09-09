import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const useRegisterForm = (setRegisterOpen) => {
  const navigate = useNavigate();
  const { register, error, setError } = useAuth();
  const [registerDetail, setRegisterDetail] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(
        registerDetail.name,
        registerDetail.email,
        registerDetail.password
      );
      setRegisterOpen(false);
      navigate("/");

      setRegisterDetail({ name: "", email: "", password: "" });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    setRegisterDetail,
    registerDetail,
    handleRegister,
    loading,
    error,
    setError,
  };
};

export default useRegisterForm;
