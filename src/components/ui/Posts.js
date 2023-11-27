import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateNotificationContext } from "../../context/NotificationContext";
import {
  PostDataContext,
  UpdatePostDataContext,
} from "../../context/PostContext";
import { UserDataContext } from "../../context/UserContext";
import {
  APIResponse,
  JSON_HEADERS,
  NotificationType,
  PATH,
  URL,
} from "../../environment/APIService";
import "../styles/Posts.css";
import Notification from "./Notification";

export default function Posts({ userFollower, currentUser }) {
  const userData = useContext(UserDataContext);

  const setNotificationData = useContext(UpdateNotificationContext);

  const postsList = useContext(PostDataContext);

  const updatePosts = useContext(UpdatePostDataContext);

  const navigate = useNavigate();

  const likePost = (post) => {
    if (userData === undefined || userData === null) {
      navigate("/login");
    } else {
      let likePost = post.hasLiked ? false : true;
      persistInteraction(post, likePost);
    }
  };

  async function persistInteraction(post, likePost) {
    fetch(URL.API_URL + PATH.PERSIST_INTERACTION, {
      method: "PATCH",
      body: JSON.stringify({
        createdBy: userData.id,
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
          else fetchUsersPost(userData.id);
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
        return console.log("Error Occured, Reason : " + err);
      });
  }

  useEffect(() => {
    let id;
    if (userData === undefined || userData === null) {
      id = 0;
    } else {
      id = userData.id;
    }

    if (!userFollower && !currentUser) fetchTrendingPost(id);
    else if (userFollower && !currentUser) fetchFollowersPost(id);
    else fetchUsersPost(id);
  }, []);

  async function fetchFollowersPost(id) {
    console.log("fetching user follower post!!");
    fetch(URL.API_URL + PATH.FETCH_FOLLOWERS_POST + id, {
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
        return console.log("Error Occured, Reason : " + err);
      });
  }

  async function fetchUsersPost(id) {
    console.log("fetching user post!!");
    fetch(URL.API_URL + PATH.FETCH_USERS_POST + id, {
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
        return console.log("Error Occured, Reason : " + err);
      });
  }

  async function fetchTrendingPost(id) {
    console.log("fetching trending post!!");
    fetch(URL.API_URL + PATH.FETCH_TRENDING_POST + id, {
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
        return console.log("Error Occured, Reason : " + err);
      });
  }
  return (
    <>
      <Notification />
      <div className="post-content">
        <div className="post">
          {postsList.length >0 && postsList.map((post) => {
            return (
              <div className="user-post" key={post.id}>
                <div className="user-data">
                  <div className="profile-image">
                    <img src="/posts/profile.svg" alt="profile" />
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

                  <div className="profile-image">&#183; 21hr</div>
                </div>

                <div className="user-content">{post.content}</div>

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

          {
            postsList.length === 0 && (
              <div className="new-user">
                <h1>Welcome to Cookspire!</h1>
                <br/>
                 Follow users / create posts to get started...
              </div>
            )
          }
        </div>
      </div>
    </>
  );
}
