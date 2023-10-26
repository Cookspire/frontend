import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Posts from "../../components/ui/Posts";
import Search from "../../components/ui/Search";
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
                  <img src="/posts/profile.svg" />
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
        {/* Add recipes cards here which is horizontal scroll */}

        <div className="trend-heading">
          <div className="new-content">Trending Posts</div>
        </div>

        <Posts />
      </div>

      <div className="explore-content">
        <Search />
      </div>
    </div>
  );
}