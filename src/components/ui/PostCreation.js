import { useEffect, useState } from "react";
import ReactDom from "react-dom";
import CloseModal from "../../hooks/CloseModal";
import "../styles/PostCreation.css";

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
  const [posts, setPosts] = useState({
    post: "",
  });

  useEffect(() => {
    document.getElementById("post").style.overflow = "hidden";
    document.getElementById("post").style.height = "0px";
    document.getElementById("post").style.height =
      document.getElementById("post").scrollHeight + "px";
    if (document.getElementById("post").scrollHeight >= 500) {
      document.getElementById("post").style.overflowY = "scroll";
    }
  }, [posts.post]);

  const closePost = CloseModal(() => {
    closeDialog(false);
  }, true);

  const submitPost=(e)=>{
    e.preventDefault();
    console.log("click triggered")

  }

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLE}>
        <div className="post-creation-content" ref={closePost}>
          <div className="posts-form">
            <div className="form-header">Create Post</div>
            <div className="form-content">
              <textarea
                id="post"
                autoComplete="off"
                rows={2}
                onChange={(e) =>
                  setPosts((prev) => ({ ...prev, post: e.target.value }))
                }
                value={posts.post}
                placeholder="What's Cooking?"
              />
            </div>

            <div className="form-action">
              <button onClick={submitPost}>Post</button>
            </div>

          </div>
        </div>
      </div>
    </>,
    document.getElementById("posts-portal")
  );
}
