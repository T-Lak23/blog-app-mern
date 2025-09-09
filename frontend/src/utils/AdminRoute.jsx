import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-hot-toast";

const AdminRoute = () => {
  const { isAuthenticated, user, authLoading } = useAuth();
  if (authLoading) return <div>Loading...</div>;
  return (
    <>
      {isAuthenticated && user?.role === "admin" ? (
        <Outlet />
      ) : (
        <>
          {toast.error("You are not authorized")}
          <Navigate to="/" replace />
        </>
      )}
    </>
  );
};

export default AdminRoute;
