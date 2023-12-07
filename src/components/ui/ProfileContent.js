import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
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

  const [userData, setUserData] = useState({ value: {}, isLoggedUser: false });

  const [loggedUser, setLoggedUser] = useState();

  const [loader, setLoader] = useState();

  const userEmail = useParams();

  const logout = useContext(LogoutUserContext);

  const setNotificationData = useContext(UpdateNotificationContext);

  const [userGeneralAnalysis, setUserGeneralAnalysis] = useState({});

  useEffect(() => {
    if (userLogged && userLogged.email != null) {
      fetchSpotlightUserDetails(userLogged.email, userEmail.email);
      fetchUserDetails(userLogged.email);
    }
  }, [userEmail]);

  async function fetchUserDetails(email) {
    fetch(BACKEND.API_URL + PATH.FETCH_USER + email, {
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return APIResponse.BAD_REQUEST;
      })
      .then((data) => {
        if (data === APIResponse.BAD_REQUEST) {
          setNotificationData(
            true,
            "Error occured while fetching user data.",
            NotificationType.INFO
          );
        } else if (data && data.email !== "") {
          setLoggedUser(data);
          fetchSpotlightUserDetails(userLogged.email, userEmail.email);
        }
      })
      .catch((err) => {
        setNotificationData(
          true,
          "Oops you got us! Raise a bug.",
          NotificationType.INFO
        );
      });
  }

  async function fetchSpotlightUserDetails(currentUser, spotlightUser) {
    fetch(BACKEND.API_URL + PATH.SPOTLIGHT_USER, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({
        spotlightUser: spotlightUser,
        currentUser: currentUser,
      }),
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else if (response.status === 404) return APIResponse.BAD_REQUEST;
        else return APIResponse.BAD_RESPONSE;
      })
      .then((data) => {
        if (data === APIResponse.BAD_REQUEST) {
          setUserData((prev) => ({
            ...prev,
            value: null,
            isLoggedUser: false,
          }));
        } else if (data === APIResponse.BAD_RESPONSE) {
          setNotificationData(
            true,
            "Error occured while fetching new user data.",
            NotificationType.INFO
          );
        } else if (data && data.email !== "") {
     
          setUserData((prev) => ({
            ...prev,
            value: data,
            isLoggedUser: data.email === userLogged.email ? true : false,
          }));
          fetchUserAnalysis(data.id);
        }
      })
      .catch((err) => {
        setNotificationData(
          true,
          "Oops you got us! Raise a bug.",
          NotificationType.INFO
        );
      });
  }

  async function fetchUserAnalysis(id) {
    fetch(BACKEND.API_URL + PATH.FETCH_GENERAL_ANALYSIS + id, {
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
        
      });
  }

  async function followUser(followerId, shouldFollow) {
    fetch(BACKEND.API_URL + PATH.FOLLOW_USER, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({
        followerId: loggedUser.id,
        followeeId: followerId,
        followUser: shouldFollow,
      }),
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return APIResponse.BAD_REQUEST;
      })
      .then((data) => {
        if (data !== APIResponse.BAD_REQUEST) {
          fetchSpotlightUserDetails(userLogged.email, userEmail.email);
        } else {
          setNotificationData(
            true,
            "Unable to follow user. Kindly raise a bug!",
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
    
      });
  }

  const submitFollowUser = (e, followerId, shouldFollow) => {
    e.preventDefault();
    followUser(followerId, shouldFollow);
  };

  return userData.value && userData.value.id === null ? (
    <>Loading...</>
  ) : userData.value != null ? (
    <div className="profile-content">
      <Notification />
      <div className="profile-info">
        <div className="profile-image">
          <img
            src={
              userData.value &&
              userData.value.imageType != null &&
              userData.value.imageType === "url"
                ? userData.value.imageName
                : "/posts/profile.svg"
            }
            alt="profile"
          />
        </div>
        <div className="profile-details">
          <div className="profile-interaction">
            <div className="name">
              {userData.value && userData.value.username}
            </div>
            {userData.value.isVerified && (
              <div className="verify-badge">
                <img
                  className="verifiedImage"
                  src="/Verified/verified.svg"
                  alt="verified"
                />
              </div>
            )}
            {!userData.isLoggedUser && userData.value && (
              <div className="interaction">
                {userData.value.isfollowing && (
                  <button
                    className="button"
                    onClick={(e) =>
                      submitFollowUser(
                        e,
                        userData.value.id,
                        !userData.value.isfollowing
                      )
                    }
                  >
                    Following
                  </button>
                )}
                {!userData.value.isfollowing && (
                  <button
                    className="button"
                    onClick={(e) =>
                      submitFollowUser(
                        e,
                        userData.value.id,
                        !userData.value.isfollowing
                      )
                    }
                  >
                    Follow
                  </button>
                )}
              </div>
            )}
          </div>

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

          {userData.value && userData.value.bio && (
            <div className="profile-bio">
              {userData.value && userData.value.bio}
            </div>
          )}
        </div>
      </div>

      {userData.value && userData.value.id && (
        <div className="profile-data">
          <nav>
            <NavLink to={"/profile/" + userData.value.email + "/posts"}>
              <div className="profile-nav">Posts</div>
            </NavLink>
            <NavLink to={"/profile/" + userData.value.email + "/followers"}>
              <div className="profile-nav">Followers</div>
            </NavLink>

            <NavLink to={"/profile/" + userData.value.email + "/following"}>
              <div className="profile-nav">Following</div>
            </NavLink>
            {userData.isLoggedUser && (
              <NavLink
                to={"/profile/" + userData.value.email + "/account/general"}
              >
                <div className="profile-nav">Account</div>
              </NavLink>
            )}
          </nav>
        </div>
      )}

      <div className="userProfile-content">
        <Outlet />
      </div>
    </div>
  ) : (
    <>
      <div className="profile-content">
        <Notification />
        <div className="profile-info">
          <div className="profile-image">
            <img src="/posts/profile.svg" alt="profile" />
          </div>
        </div>
        <div className="profile-data">
          <div className="new-user">
            <h1>This user doesn't exist</h1>
          </div>
        </div>
      </div>
    </>
  );
}
