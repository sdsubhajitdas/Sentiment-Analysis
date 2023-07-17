import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import NoAccess from "../pages/NoAccess";

export default function ProtectedRoutes() {
  let {
    authentication: { isAuthenticated, user },
  } = useAuth();

  if (isAuthenticated) {
    return user.status === "ACTIVE" ? <Outlet /> : <NoAccess />;
  }

  return <Navigate to="/login" />;
}
