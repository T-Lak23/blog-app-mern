import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const useNavAuth = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
  };

  const handleDashboard = async () => {
    if (isAuthenticated && user?.role === "admin") {
      navigate("/dashboard");
    }
  };
  return { isAuthenticated, user, handleDashboard, handleLogout };
};

export default useNavAuth;
