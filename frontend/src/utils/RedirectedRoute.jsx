import { useAuth } from "../context/authContext";

const RedirectedRoute = ({ children }) => {
  const { isAuthenticated, authLoading } = useAuth();
  if (authLoading) <div>Loading...</div>;
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default RedirectedRoute;
