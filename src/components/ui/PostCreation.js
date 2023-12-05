import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useContext, useEffect, useRef, useState } from "react";
import ReactDom, { createPortal } from "react-dom";
import { UpdateNotificationContext } from "../../context/NotificationContext";
import { UpdatePostDataContext } from "../../context/PostContext";
import { LogoutUserContext, UserDataContext } from "../../context/UserContext";
import PostAddIcon from "@mui/icons-material/PostAdd";

import {
  APIResponse,
  JSON_HEADERS,
  NotificationType,
  PATH,
  BACKEND,
} from "../../environment/APIService";
import CloseModal from "../../hooks/CloseModal";
import "../styles/PostCreation.css";
import Notification from "./Notification";
import RecipeDetails from "./RecipeDetails";

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
  const [userData, setUserData] = useState();

  const userLogged = useContext(UserDataContext);

  useEffect(() => {
    if (userLogged && userLogged.email) {
      fetchUserDetails(userLogged.email);
    } else {
      logout();
    }
  }, []);

  const logout = useContext(LogoutUserContext);

  const setNotificationData = useContext(UpdateNotificationContext);

  const updatePosts = useContext(UpdatePostDataContext);

  const [showRecipe, setShowRecipe] = useState(false);

  const [post, setPost] = useState({
    content: "",
  });

  const [filePreview, setFilePreview] = useState({
    show: false,
    imageURL: null,
  });

  const [file, setFile] = useState();

  const [valid, setValid] = useState({
    showDisable: true,
    showBuffer: false,
  });

  useEffect(() => {
    document.getElementById("post").style.overflow = "hidden";
    document.getElementById("post").style.height = "0px";
    document.getElementById("post").style.height =
      document.getElementById("post").scrollHeight + "px";
    if (document.getElementById("post").scrollHeight >= 250) {
      document.getElementById("post").style.overflowY = "scroll";
    }
  }, [post.content]);

  async function fetchUserDetails(email) {
    await fetch(BACKEND.API_URL + PATH.FETCH_USER + email, {
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
          setUserData(() => data);
        }
      })
      .catch((err) => {
        logout();
      });
  }

  // const closePost = CloseModal(() => {
  //   closeDialog(false);
  // }, true);

  const handlePostInput = (e) => {
    setPost((prev) => ({ ...prev, content: e.target.value }));
    e.target.value.length > 0
      ? setValid((prev) => ({ ...prev, showDisable: false }))
      : setValid((prev) => ({ ...prev, showDisable: true }));
  };

  async function fetchUsersPost(id) {
    fetch(
      BACKEND.API_URL +
        PATH.FETCH_USERS_POST +
        userLogged.email +
        "&fetchUser=" +
        userLogged.email,
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

  const uploadPostImageRef = useRef();

  async function persistPosts(postData) {
    const formdata = new FormData();
    formdata.set("data", JSON.stringify(postData));
    formdata.set("file", file);

    fetch(BACKEND.API_URL + PATH.PERSIST_POST, {
      method: "PUT",
      body: formdata,
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

  const openFileUpload = (event) => {
    event.preventDefault();
    uploadPostImageRef.current.click();
  };

  const removeImage = (e) => {
    e.preventDefault();
    setFilePreview((prev) => ({
      ...prev,
      show: false,
      imageURL: null,
    }));
  };

  const handleFileUpload = (event) => {
    event.preventDefault();
    if (
      uploadPostImageRef.current.files[0] &&
      uploadPostImageRef.current.files[0] !== null
    ) {
      let file = uploadPostImageRef.current.files[0];
      if (
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
      ) {
        if (file.size <= 300000) {
          setFile(uploadPostImageRef.current.files[0]);
          setFilePreview((prev) => ({
            ...prev,
            show: true,
            imageURL: URL.createObjectURL(uploadPostImageRef.current.files[0]),
          }));
        } else {
          setNotificationData(
            true,
            "Kindly upload image size less than 300KB.",
            NotificationType.INFO
          );
        }
      } else {
        setNotificationData(
          true,
          "Only .jpg and .png files are allowed.",
          NotificationType.INFO
        );
      }
    }
  };

  const closeRecipeDialog = (e) => {
    e.preventDefault();
    closeDialog(false);
  };

  return ReactDom.createPortal(
    <>
      <Notification />
      <div style={OVERLAY_STYLE}>
        <div className="post-creation-content">
          <div
            className="close-dialog"
            title="close"
            onClick={(e) => closeRecipeDialog(e)}
          >
            <div className="remove-icon">&times;</div>
          </div>
          <div className="posts-form">
            <div className="form-header">Create Post</div>
            <div className="user-data">
              <div className="profile-image">
                <img src="/posts/profile.svg" alt="profile" />
              </div>

              <div className="profile-name">
                {userData && userData.username}
                {userData && userData.isVerified && (
                  <img
                    src="/Verified/verified.svg"
                    width={"10px"}
                    height={"10px"}
                    alt="verified"
                  />
                )}
              </div>
            </div>
            <div className="form-content">
              <textarea
                id="post"
                autoComplete="off"
                rows={2}
                onChange={(e) => handlePostInput(e)}
                value={post.content}
                maxLength={1000}
                placeholder="What's Cooking?"
                autoFocus
              />

              <input
                type="file"
                ref={uploadPostImageRef}
                id="post-image"
                style={{ display: "none" }}
                accept=".png, .jpg, image/png, image/jg"
                onChange={(e) => handleFileUpload(e)}
              />

              {filePreview.show && (
                <>
                  <div className="post-image-container">
                    <img
                      className="post-image"
                      alt="imagePreview"
                      src={filePreview.imageURL}
                    />
                    <div
                      className="remove-pic"
                      title="Remove Image"
                      onClick={(e) => removeImage(e)}
                    >
                      <div className="remove-icon">&times;</div>
                    </div>
                  </div>
                </>
              )}
              <div className="post-attachments" title="Upload image">
                <div className="text-content">Add to your post</div>
                <div
                  className="photo-attachment"
                  onClick={(e) => openFileUpload(e)}
                >
                  <AddPhotoAlternateIcon htmlColor="blue" fontSize="medium" />
                </div>

                <div
                  className="photo-attachment"
                  title="Add Recipe"
                  onClick={() => setShowRecipe(true)}
                >
                  <PostAddIcon htmlColor="orange" fontSize="medium" />
                </div>
              </div>
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

        {showRecipe &&
          createPortal(
            <RecipeDetails handleClose={setShowRecipe} createRecipe={true} />,
            document.getElementById("recipe-details-portal")
          )}
      </div>
    </>,
    document.getElementById("posts-portal")
  );
}
