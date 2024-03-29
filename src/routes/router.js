import { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Account from "../components/ui/Account";
import Followers from "../components/ui/Followers";
import GeneralSettings from "../components/ui/GeneralSettings";
import PasswordSettings from "../components/ui/PasswordSettings";
import Posts from "../components/ui/Posts";
import Verification from "../components/ui/Verification";
import { LogoutUserContext, UserDataContext } from "../context/UserContext";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Cuisine from "../pages/Cuisine";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound/NotFound";
import Profile from "../pages/Profile";
import Recipe from "../pages/Recipe";
import Search from "../pages/Search";
import Trending from "../pages/Trending";
import ProtectedRoute from "./ProtectedRoute";
import Course from "../pages/Course";
import Test from "../pages/UserProfile";
import { APIResponse, BACKEND, PATH } from "../environment/APIService";
import Following from "../components/ui/Following";
import RecipeSearch from "../components/ui/RecipeSearch";
import PeopleSearch from "../components/ui/PeopleSearch";

export default function AppRouter() {
  const userData = useContext(UserDataContext);

  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />}></Route>

        <Route
          path="/"
          element={
            userData && userData.email ? (
              <Navigate to="/home" />
            ) : (
              <Navigate to="/explore" />
            )
          }
        ></Route>

        <Route
          path="/login"
          element={
            userData && userData.email ? <Navigate to="/home" /> : <Login />
          }
        ></Route>

        <Route
          path="/register"
          element={
            userData && userData.email ? <Navigate to="/home" /> : <Register />
          }
        ></Route>

        <Route exact path="/search" element={<Search />}>
          <Route path="/search/recipe" element={<RecipeSearch />} />
          <Route path="/search/people" element={<PeopleSearch />} />
        </Route>

        <Route exact path="/explore">
          <Route path="/explore" element={<Recipe />} />
          <Route path="/explore/cuisine/:name" element={<Cuisine />} />
          <Route path="/explore/course/:name" element={<Course />} />
        </Route>

        <Route path="/trending" element={<Trending />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />}></Route>

          <Route path="/test" element={<Test />}></Route>

          <Route path="/profile" element={<Profile />}>
            <Route exact path="/profile/:email" element={<></>} />

            <Route
              path="/profile/:email/posts"
              element={
                <Posts
                  userFollower={false}
                  currentUser={true}
                  userData={userData}
                />
              }
            />
            <Route path="/profile/:email/followers" element={<Followers />} />
            <Route path="/profile/:email/following" element={<Following />} />

            <Route exact path="/profile/:email/account" element={<Account />}>
              <Route
                index
                path="/profile/:email/account/general"
                element={<GeneralSettings />}
              />
              <Route
                index
                path="/profile/:email/account/sensitive"
                element={<PasswordSettings />}
              />
              <Route
                path="/profile/:email/account/delete"
                element={<Verification />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}
