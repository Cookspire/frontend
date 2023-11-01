import { useContext, useEffect, useState } from "react";
import ReactDom from "react-dom";
import { UpdateNotificationContext } from "../../context/NotificationContext";
import {
  UpdatePostDataContext
} from "../../context/PostContext";
import { UserDataContext } from "../../context/UserContext";
import {
  APIResponse,
  JSON_HEADERS,
  NotificationType,
  PATH,
  URL,
} from "../../environment/APIService";
import CloseModal from "../../hooks/CloseModal";
import "../styles/PostCreation.css";
import Notification from "./Notification";

const OVERLAY_STYLE = {
  backgroundColor: "rgb(0 0 0 / 70%)",
  zIndex: 1000,
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  flexDirection: "column",
};

export default function PostCreation({ closeDialog }) {
  const userData = useContext(UserDataContext);

  const setNotificationData = useContext(UpdateNotificationContext);

  const updatePosts = useContext(UpdatePostDataContext);

  const [post, setPost] = useState({
    content: "",
  });

  const [valid, setValid] = useState({
    showDisable: true,
    showBuffer: false,
  });

  useEffect(() => {
    document.getElementById("post").style.overflow = "hidden";
    document.getElementById("post").style.height = "0px";
    document.getElementById("post").style.height =
      document.getElementById("post").scrollHeight + "px";
    if (document.getElementById("post").scrollHeight >= 500) {
      document.getElementById("post").style.overflowY = "scroll";
    }
  }, [post.content]);

  const closePost = CloseModal(() => {
    closeDialog(false);
  }, true);

  const handlePostInput = (e) => {
    setPost((prev) => ({ ...prev, content: e.target.value }));
    e.target.value.length > 0
      ? setValid((prev) => ({ ...prev, showDisable: false }))
      : setValid((prev) => ({ ...prev, showDisable: true }));
  };

  async function fetchUsersPost(id) {
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
          closeDialog(false);
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

  async function persistPosts(postData) {
    fetch(URL.API_URL + PATH.PERSIST_POST, {
      method: "PUT",
      body: JSON.stringify(postData),
      headers: JSON_HEADERS,
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else {
          console.log(response.text());
          return APIResponse.BAD_REQUEST;
        }
      })
      .then((data) => {
        setValid((prev) => ({
          ...prev,
          showDisable: false,
          showBuffer: false,
        }));
        if (data !== APIResponse.BAD_REQUEST) {
          setPost((prev) => ({ ...prev, content: "" }));
          fetchUsersPost(userData.id);
        } else {
          setNotificationData(true, "Post not created", NotificationType.INFO);
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

  const submitPost = (e) => {
    e.preventDefault();
    setValid((prev) => ({ ...prev, showDisable: false, showBuffer: true }));
    persistPosts({
      content: post.content,
      createdBy: userData.id,
      likes: 0,
      dislikes: 0,
    });
  };

  return ReactDom.createPortal(
    <>
      <Notification />
      <div style={OVERLAY_STYLE}>
        <div className="post-creation-content" ref={closePost}>
          <div className="posts-form">
            <div className="form-header">Create Post</div>
            <div className="form-content">
              <textarea
                id="post"
                autoComplete="off"
                rows={2}
                onChange={(e) => handlePostInput(e)}
                value={post.content}
                placeholder="What's Cooking?"
                autoFocus
              />
            </div>

            <div className="form-action">
              {!valid.showDisable && !valid.showBuffer && (
                <button onClick={submitPost}>Post</button>
              )}

              {valid.showDisable && (
                <button className="invalid-button">Post</button>
              )}

              {valid.showBuffer && (
                <button className="invalid-button">
                  Posting...&nbsp; <div className="loader"></div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("posts-portal")
  );
}
