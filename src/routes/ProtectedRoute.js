import { useContext } from "react";

import { Navigate, Outlet } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

export default function ProtectedRoute() {
  const userData = useContext(UserDataContext);

  return userData && userData.email != null ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
