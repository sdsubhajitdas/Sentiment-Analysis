import { Navigate, Outlet } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import NoAccess from "../pages/NoAccess";

export default function ProtectedRoutes() {
  let {
    authentication: { isAuthenticated, user },
  } = useAuthentication();

  if (isAuthenticated) {
    return user.status === "ACTIVE" ? <Outlet /> : <NoAccess />;
  }

  return <Navigate to="/login" />;
}
