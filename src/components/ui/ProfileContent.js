import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { UpdateNotificationContext } from "../../context/NotificationContext";
import { LogoutUserContext, UserDataContext } from "../../context/UserContext";
import {
  APIResponse,
  BACKEND,
  JSON_HEADERS,
  NotificationType,
  PATH,
} from "../../environment/APIService";
import "../styles/ProfileContent.css";
import Notification from "./Notification";

export default function Profile() {
  const userLogged = useContext(UserDataContext);

  const [userData, setUserData] = useState();

  const logout = useContext(LogoutUserContext);

  const setNotificationData = useContext(UpdateNotificationContext);

  const [userGeneralAnalysis, setUserGeneralAnalysis] = useState({});

  useEffect(() => {
    if (userLogged && userLogged.email != null) {
      fetchUserDetails(userLogged.email);
    } else {
      fetchUserAnalysis();
    }
  }, []);

  async function fetchUserDetails(email) {
    fetch(BACKEND.API_URL + PATH.FETCH_USER + email, {
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return APIResponse.UNAUTHORIZED;
      })
      .then((data) => {
        if (data === APIResponse.UNAUTHORIZED) {
          logout();
        } else if (data && data.email !== "") {
          setUserData(data);
          console.log();
        }
      })
      .catch((err) => {
        logout();
      });
  }

  async function fetchUserAnalysis() {
    fetch(BACKEND.API_URL + PATH.FETCH_GENERAL_ANALYSIS + userData.id, {
      method: "POST",
      headers: JSON_HEADERS,
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else if (response.status === 403 || response.status === 401) logout();
        else return APIResponse.BAD_REQUEST;
      })
      .then((data) => {
        if (data !== APIResponse.BAD_REQUEST) {
          setUserGeneralAnalysis(data);
        } else {
          setNotificationData(
            true,
            "Error while fetching user general analysis",
            NotificationType.INFO
          );
        }
      })
      .catch((err) => {
        setNotificationData(
          true,
          "Oops you got us! Kindly raise a bug.",
          NotificationType.INFO
        );
        return console.log("Error Occured, Reason : " + err);
      });
  }

  return userData && userData.id === null ? (
    <>Loading...</>
  ) : (
    <div className="profile-content">
      <Notification />
      <div className="profile-info">
        <div className="profile-image">
          <img src="/posts/profile.svg" alt="profile" />
        </div>
        <div className="profile-details">
          <div className="profile-name">{userData && userData.username}</div>

          <div className="profile-stats">
            <div className="stats">
              <b>{userGeneralAnalysis.postCount}&nbsp;</b> posts
            </div>

            <div className="stats">
              <b>{userGeneralAnalysis.followerCount}&nbsp;</b> followers
            </div>

            <div className="stats">
              <b>{userGeneralAnalysis.followingCount}&nbsp;</b> following
            </div>
          </div>

          <div className="profile-bio">{userData && userData.bio}</div>
        </div>
      </div>

      {userData && userData.id && (
        <div className="profile-data">
          <nav>
            <NavLink to={"/profile/" + userData.id + "/posts"}>
              <div className="profile-nav">Posts</div>
            </NavLink>
            <NavLink to={"/profile/" + userData.id + "/followers"}>
              <div className="profile-nav">Followers</div>
            </NavLink>

            <NavLink to={"/profile/" + userData.id + "/followers"}>
              <div className="profile-nav">Following</div>
            </NavLink>
            <NavLink to={"/profile/" + userData.id + "/account/general"}>
              <div className="profile-nav">Account</div>
            </NavLink>
          </nav>
        </div>
      )}

      <Outlet />
    </div>
  );
}
