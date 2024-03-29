import { useContext, useEffect, useState } from "react";
import PostCreation from "../../components/ui/PostCreation";
import Posts from "../../components/ui/Posts";
import QuickAction from "../../components/ui/QuickAction";
import "./index.css";
import { LogoutUserContext, UserDataContext } from "../../context/UserContext";
import { APIResponse, BACKEND, PATH } from "../../environment/APIService";


export default function Home() {
  const [newPost, setNewPost] = useState(false);

  const logout = useContext(LogoutUserContext);

  const userLogged = useContext(UserDataContext);

  const [userData, setUserData] = useState();

  useEffect(() => {
  
    if (userLogged && userLogged.email) {
      fetchUserDetails(userLogged.email);
      
    }
  }, []);

  async function fetchUserDetails(email) {
    fetch(BACKEND.API_URL + PATH.FETCH_USER + email, {
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
          
          setUserData(()=>data);
        }
      })
      .catch((err) => {
        logout();
      });
  }

  return (
    <div className="main-content">
      <div className="post-container">
        <div className="post-creation">
          <div className="new-content">
            <div className="creation-form">
              <div className="profile-image">
                <img alt="profile" src={
                          userData &&
                          userData.imageType != null &&
                          userData.imageType === "url"
                            ? userData.imageName
                            : "/posts/profile.svg"
                        } />
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

       {userData && userData.email && <Posts userFollower={true} currentUser={false} userData={userData}/>}

        {newPost && <PostCreation closeDialog={setNewPost} />}
      </div>

      <div className="explore-container">
        <QuickAction />
      </div>
    </div>
  );
}
