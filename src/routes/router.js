import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Account from "../components/ui/Account";
import Followers from "../components/ui/Followers";
import Posts from "../components/ui/Posts";
import { UserDataContext } from "../context/UserContext";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Cusine from "../pages/Cusines";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound/NotFound";
import Profile from "../pages/Profile";
import Recipe from "../pages/Recipes";
import Trending from "../pages/Trending";
import ProtectedRoute from "./ProtectedRoute";
import GeneralSettings from "../components/ui/GeneralSettings"
import Verification from "../components/ui/Verification"

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
              <Cusine />
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

          <Route exact path="/profile" element={<Profile />}>
            <Route index path="/profile/:id/posts" element={<Posts />} />
            <Route path="/profile/:id/followers" element={<Followers />} />
            <Route path="/profile/:id/following" element={<Followers />} />

            <Route exact path="/profile/:id/account" element={<Account />}>
              <Route index path="/profile/:id/account/general" element={<GeneralSettings />} />
              <Route
                path="/profile/:id/account/verification"
                element={<Verification />}
              />
            </Route>

          </Route>
        </Route>
      </Routes>
    </>
  );
}
