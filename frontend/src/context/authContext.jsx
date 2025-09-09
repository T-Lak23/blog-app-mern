import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import { toast } from "react-hot-toast";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  const fetchUser = async () => {
    setError("");
    try {
      const { data } = await API.get("/auth/user");
      setUser(data?.user);
    } catch (error) {
      //   setError(error?.response?.data?.message);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async (email, password) => {
    setError("");
    try {
      const { data } = await API.post("/auth/login", { email, password });
      setUser(data?.user);
      toast.success("Logged in successfully");
      //   const role = data?.user?.role;
      //   role === "admin" ? navigate("/dashboard") : navigate("/");
      //   navigate("/");
      return data?.user;
    } catch (error) {
      setError(error?.response?.data?.message);
      setUser(null);
      toast.error(error?.response?.data?.message || "Login Failed");
    }
  };

  const register = async (name, email, password) => {
    setError("");
    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
      });
      setUser(data?.user);
      toast.success("Account created");
      navigate("/");
    } catch (error) {
      const err = error.response?.data?.message || "Registration failed";
      toast.error(err);
      setError(err);
    }
  };

  const logout = async () => {
    setError("");
    try {
      await API.post("/auth/logout");
      setUser(null);
      toast.success("Logged out");
      navigate("/");
    } catch (error) {
      const err = error.response?.data?.message || "Logout failed";
      toast.error(err);
      setError(err);
    }
  };

  const clearError = async () => {
    setError("");
  };
  const isAuthenticated = !!user;

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        isAuthenticated,
        login,
        register,
        logout,
        error,
        clearError,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
