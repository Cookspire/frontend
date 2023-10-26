import Posts from "../../components/ui/Posts";
import "./index.css";
import { UserDataContext } from "../../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="post-container">
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

      <Posts />
    </div>
  );
}
