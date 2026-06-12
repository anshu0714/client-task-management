import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import Loader from "../shared/components/Loader";

export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}