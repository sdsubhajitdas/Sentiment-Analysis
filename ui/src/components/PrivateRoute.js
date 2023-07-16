import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute() {
  let {
    authentication: { isAuthenticated },
  } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
