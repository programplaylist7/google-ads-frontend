import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  // 🔥 wait until auth check completes
  if (loading) return <div>Loading...</div>;

  if (user) return <Navigate to="/" />;

  return children;
};

export default PublicRoute;