import { useState } from "react";
import PostCreation from "../../components/ui/PostCreation";
import Posts from "../../components/ui/Posts";
import QuickAction from "../../components/ui/QuickAction";
import "./index.css";

export default function Home() {
  const [newPost, setNewPost] = useState(false);

  
  return (
    <div className="main-content">
      <div className="post-container">
        <div className="post-creation">
          <div className="new-content">
            <div className="creation-form">
              <div className="profile-image">
                <img alt="profile" src="/posts/profile.svg" />
              </div>
              <div
                className="new-post"
                onClick={() => {
                  setNewPost(true);
                }}
              >
                Create Post
              </div>
            </div>
          </div>
        </div>

        {/* show followers posts */}

        <Posts userFollower={true} currentUser={false} />

        {newPost && <PostCreation closeDialog={setNewPost} />}
      </div>

      <div className="explore-container">
        <QuickAction />
      </div>
    </div>
  );
}
