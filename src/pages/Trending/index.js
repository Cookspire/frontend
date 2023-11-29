import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import HorizontalContent from "../../components/ui/HorizontalContent";
import Posts from "../../components/ui/Posts";
import QuickAction from "../../components/ui/QuickAction";
import { UserDataContext } from "../../context/UserContext";
import "./index.css";

export default function Trending() {
  const navigate = useNavigate();

  const userData = useContext(UserDataContext);

  const createPost = () => {
    if (
      !(
        userData &&
        userData.email !== "" &&
        localStorage.getItem("persist") !== ""
      )
    ) {
      navigate("/login");
    }
  };

  return (
    <div className="main-content">
      <div className="post-container">
        {userData == null && (
          <div className="post-creation">
            <div className="new-content">
              <div className="creation-form">
                <div className="profile-image">
                  <img src="/posts/profile.svg" alt="profile" />
                </div>

                <div className="new-post" onClick={createPost}>
                  Create Post
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="trend-heading">
          <div className="new-content">Trending Recipes</div>
        </div>

        <div className="trend-content">
          <HorizontalContent />
        </div>

        <div className="trend-heading">
          <div className="new-content">Trending Posts</div>
        </div>

        <Posts userFollower={false} currentUser={false} userData={null}/>
      </div>

      <div className="explore-container">
        <QuickAction />
      </div>
    </div>
  );
}
