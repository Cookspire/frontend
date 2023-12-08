import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateNotificationContext } from "../../context/NotificationContext";
import {
  PostDataContext,
  UpdatePostDataContext,
} from "../../context/PostContext";
import { UserDataContext } from "../../context/UserContext";
import {
  APIResponse,
  BACKEND,
  IMAGE_SRC,
  IMAGE_TYPE,
  JSON_HEADERS,
  NotificationType,
  PATH,
  TRENDING,
} from "../../environment/APIService";
import "../styles/Posts.css";
import Notification from "./Notification";

export default function Posts({ userFollower, currentUser, userData }) {
  const userLogged = useContext(UserDataContext);

  const setNotificationData = useContext(UpdateNotificationContext);

  const postsList = useContext(PostDataContext);

  const updatePosts = useContext(UpdatePostDataContext);

  const urlParam = useParams();

  const navigate = useNavigate();

  const [showLoader, setShowLoader] = useState(false);

  const [loggedUser, setLoggedUser] = useState();

  useEffect(() => {
    updatePosts([]);
    if (!userFollower && !currentUser) {
      fetchTrendingPost(TRENDING.ID);
    } else if (userFollower && !currentUser) {
      if (userData.id != null) {
        setLoggedUser(userData);
        fetchFollowersPost(userData.id);
      } else {
        setNotificationData(
          true,
          "Unable to fetch posts. Kindly raise a bug.",
          NotificationType.INFO
        );
      }
    } else {
      if (urlParam.email != null) {
        fetchUserDetails(userLogged.email);
      } else {
        setNotificationData(
          true,
          "Unable to fetch posts. Kindly raise a bug.",
          NotificationType.INFO
        );
      }
    }
  }, []);

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
          fetchUsersPost(data.id);
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
          fetchSpotlightUserDetails(data.email, urlParam.email);
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

  const likePost = (post) => {
    if (userLogged=== null) {
      navigate("/login");
    } else {
      let likePost = post.hasLiked ? false : true;
      persistInteraction(post, likePost);
    }
  };

  async function persistInteraction(post, likePost) {
    fetch(BACKEND.API_URL + PATH.PERSIST_INTERACTION, {
      method: "PATCH",
      body: JSON.stringify({
        createdBy: loggedUser.id,
        postId: post.id,
        liked: likePost,
      }),
      headers: JSON_HEADERS,
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else {
          return APIResponse.BAD_REQUEST;
        }
      })
      .then((data) => {
        if (data !== APIResponse.BAD_REQUEST) {
          if (!userFollower && !currentUser) fetchTrendingPost(0);
          else if (userFollower && !currentUser)
            fetchFollowersPost(userData.id);
          else fetchUsersPost();
        } else {
          setNotificationData(
            true,
            "Unable to fetch posts. Kindly raise a bug.",
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

  async function fetchFollowersPost(id) {
    setShowLoader(true);
    fetch(BACKEND.API_URL + PATH.FETCH_FOLLOWERS_POST + id, {
      method: "POST",
      headers: JSON_HEADERS,
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else {
          return APIResponse.BAD_REQUEST;
        }
      })
      .then((data) => {
        setShowLoader(false);
        if (data !== APIResponse.BAD_REQUEST) {
          updatePosts(data);
        } else {
          setNotificationData(
            true,
            "Unable to fetch posts. Kindly raise a bug.",
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

  async function fetchUsersPost() {
    setShowLoader(true);
    fetch(
      BACKEND.API_URL +
        PATH.FETCH_USERS_POST +
        userLogged.email +
        "&fetchUser=" +
        urlParam.email,
      {
        method: "POST",
        headers: JSON_HEADERS,
      }
    )
      .then((response) => {
        if (response.status === 200) return response.json();
        else {
          return APIResponse.BAD_REQUEST;
        }
      })
      .then((data) => {
        setShowLoader(false);
        if (data !== APIResponse.BAD_REQUEST) {
          updatePosts(data);
        } else {
          setNotificationData(
            true,
            "Unable to fetch posts. Kindly raise a bug.",
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

  const dateFormat = (date) => {
    const converted = new Date(date);
    return (
      converted.toLocaleString("en-us", { month: "long" }) +
      " " +
      new Date(date).getDate().toString()
    );
  };

  async function fetchTrendingPost(id) {
    setShowLoader(true);
    fetch(BACKEND.API_URL + PATH.FETCH_TRENDING_POST + id, {
      method: "POST",
      headers: JSON_HEADERS,
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else {
          return APIResponse.BAD_REQUEST;
        }
      })
      .then((data) => {
        setShowLoader(false);
        if (data !== APIResponse.BAD_REQUEST) {
          updatePosts(data);
        } else {
          setNotificationData(
            true,
            "Unable to fetch posts. Kindly raise a bug.",
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

  const showImage = (imageData, imageType) => {
    if (imageType === IMAGE_TYPE.JPEG) return IMAGE_SRC.JPEG + imageData;
    else if (imageType === IMAGE_TYPE.PNG) return IMAGE_SRC.PNG + imageData;
    else {
      setNotificationData(
        true,
        "Error occured while loading file in posts",
        NotificationType.INFO
      );
    }
  };

  return (
    <>
      <Notification />
      <div className="post-content">
        <div className="post">
          {postsList.length > 0 &&
            postsList.map((post) => {
              return (
                <div className="user-post" key={post.id}>
                  <div className="user-data">
                    <div className="profile-image">
                      <img
                        src={
                          post.createdUser &&
                          post.createdUser.imageType != null &&
                          post.createdUser.imageType === "url"
                            ? post.createdUser.imageName
                            : "/posts/profile.svg"
                        }
                        alt="profile"
                      />
                    </div>

                    <div className="profile-name">
                      {post.createdUser.username}
                      {post.createdUser.isVerified && (
                        <img
                          src="/Verified/verified.svg"
                          width={"10px"}
                          height={"10px"}
                          alt="verified"
                        />
                      )}
                    </div>

                    <div className="profile-image">
                      &#183; {dateFormat(post.updatedOn)}
                    </div>
                  </div>

                  <div className="user-content">
                    {post.content && post.content.length > 0 && (
                      <div className="text-content">{post.content}</div>
                    )}

                    <div className="image-content">
                      {post.imageData && post.imageData.length > 0 && (
                        <img
                          src={showImage(post.imageData, post.imageType)}
                          alt="user-post"
                        />
                      )}
                    </div>
                  </div>

                  <div className="post-interaction">
                    <div className="like" onClick={() => likePost(post)}>
                      <div className="icon">
                        {post.hasLiked && (
                          <ThumbUpIcon
                            className="like-icon"
                            htmlColor="hsl(120, 43%, 47%)"
                            fontSize="small"
                          />
                        )}

                        {!post.hasLiked && (
                          <ThumbUpOutlinedIcon
                            className="like-icon"
                            htmlColor="hsl(120, 43%, 47%)"
                            fontSize="small"
                          />
                        )}
                      </div>
                      <div className="count">{post.likes}</div>
                    </div>
                  </div>
                </div>
              );
            })}

          {postsList.length === 0 && !currentUser && (
            <>
              {showLoader ? (
                <div className="center-loader">
                  <div className="loader"></div>
                </div>
              ) : (
                <div className="new-user">
                  <h1>Welcome to Cookspire!</h1>
                  <br />
                  Follow users / create posts to get started...
                </div>
              )}
            </>
          )}

          {postsList.length === 0 && currentUser && (
            <>
              {showLoader ? (
                <div className="center-loader">
                  <div className="loader"></div>
                </div>
              ) : (
                <div className="new-user">No posts yet...</div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
