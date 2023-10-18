import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../components/ui/NotFound";
import { UserDataContext } from "../context/UserContext";
import Account from "../pages/Account";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/Home";
import Welcome from "../pages/Welcome";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  const userData = useContext(UserDataContext);
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />}></Route>

        <Route
          path="/"
          element={
            userData && localStorage.getItem("persist") ? (
              <Navigate to="/home" />
            ) : (
              <Welcome />
            )
          }
        ></Route>

        <Route
          path="/login"
          element={
            userData && localStorage.getItem("persist") ? (
              <Navigate to="/home" />
            ) : (
              <Login />
            )
          }
        ></Route>

        <Route
          path="/register"
          element={
            userData && localStorage.getItem("persist") ? (
              <Navigate to="/home" />
            ) : (
              <Register />
            )
          }
        ></Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />}></Route>

          <Route path="/account" element={<Account />}></Route>
        </Route>
      </Routes>
    </>
  );
}
