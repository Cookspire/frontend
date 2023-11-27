import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Account from "../components/ui/Account";
import Followers from "../components/ui/Followers";
import GeneralSettings from "../components/ui/GeneralSettings";
import PasswordSettings from "../components/ui/PasswordSettings";
import Posts from "../components/ui/Posts";
import Verification from "../components/ui/Verification";
import { UserDataContext } from "../context/UserContext";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Cuisine from "../pages/Cuisine";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound/NotFound";
import Profile from "../pages/Profile";
import Recipe from "../pages/Recipe";
import Trending from "../pages/Trending";
import ProtectedRoute from "./ProtectedRoute";
import Course from "../pages/Course";

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
              <Navigate to="/explore" />
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
          <Route path="/explore" element={<Recipe />} />
          <Route path="/explore/cuisine/:name" element={<Cuisine />} />
          <Route path="/explore/course/:name" element={<Course />} />
        </Route>

        <Route path="/trending" element={<Trending />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />}></Route>

          <Route path="/profile" element={<Profile />}>
            <Route
              exact
              path="/profile/:id/posts"
              element={<Posts userFollower={false} currentUser={true} />}
            />
            <Route path="/profile/:id/followers" element={<Followers />} />
            <Route path="/profile/:id/following" element={<Followers />} />

            <Route exact path="/profile/:id/account" element={<Account />}>
              <Route
                index
                path="/profile/:id/account/general"
                element={<GeneralSettings />}
              />
              <Route
                index
                path="/profile/:id/account/sensitive"
                element={<PasswordSettings />}
              />
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
