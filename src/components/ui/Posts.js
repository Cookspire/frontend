import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { useContext, useEffect } from "react";
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

  useEffect(() => {
    let id;
    if (userData === undefined) {
      id = 0;
    } else {
      id = userData.id;
    }

    if (!userFollower && !currentUser) fetchTrendingPost(id);
    else if (userFollower && !currentUser) fetchFollowersPost(id);
    else fetchUsersPost(id);
  }, []);

  async function fetchFollowersPost(id) {
    console.log("fetching user follower post!!")
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
    console.log("fetching user post!!")
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
    console.log("fetching trending post!!")
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
          {postsList.map((post) => {
            return (
              <div className="user-post" key={post.id}>
                <div className="user-data">
                  <div className="profile-image">
                    <img src="/posts/profile.svg" />
                  </div>

                  <div className="profile-name">
                    {post.createdUser.username}
                  </div>

                  <div className="profile-image">&#183; 21hr</div>
                </div>

                <div className="user-content">{post.content}</div>

                <div className="post-interaction">
                  <div className="interaction">
                    <ThumbUpOutlinedIcon htmlColor="grey" fontSize="10px" />
                  </div>
                  <div className="interaction">
                    <ThumbDownOutlinedIcon htmlColor="grey" fontSize="10px" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
