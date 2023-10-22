import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import Account from "../pages/Account";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Cusine from "../pages/Cusines";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound/NotFound";
import Recipe from "../pages/Recipes";
import Trending from "../pages/Trending";
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

        <Route exact path="/explore">
          <Route path="/explore" element={<Cusine />} />
          <Route path="/explore/categories/recipes" element={<Recipe />} />
        </Route>

        <Route path="/trending" element={<Trending />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />}></Route>

          <Route path="/account" element={<Account />}></Route>
        </Route>
      </Routes>
    </>
  );
}
