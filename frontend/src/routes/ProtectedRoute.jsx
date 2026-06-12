import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import Loader from "../shared/components/Loader";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}