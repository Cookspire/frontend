import { NavLink, useParams } from "react-router-dom";
import "../styles/Following.css";
import { useContext, useEffect, useState } from "react";
import { LogoutUserContext, UserDataContext } from "../../context/UserContext";
import { APIResponse, BACKEND, PATH } from "../../environment/APIService";

export default function Following() {
  const userEmail = useParams();

  const logout = useContext(LogoutUserContext);

  const userLogged = useContext(UserDataContext);

  const [userData, setUserData] = useState();

  const [showLoader, setShowLoader] = useState(true);

  const [userFollowing, setUserFollowing] = useState();

  useEffect(() => {
    if (userLogged && userLogged.email != null) {
      fetchUserDetails(userEmail.email);
    } else {
      logout();
    }
  }, []);

  async function fetchUserDetails(email) {
    setShowLoader(true);
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
          setUserData(() => data);
          fetchUserFollowing(data.id);
        }
      })
      .catch((err) => {
        logout();
      });
  }

  async function fetchUserFollowing(id) {
    fetch(BACKEND.API_URL + PATH.FETCH_USER_FOLLOWER_INFO + id, {
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return APIResponse.UNAUTHORIZED;
      })
      .then((data) => {
        setShowLoader(false);
        if (data === APIResponse.UNAUTHORIZED) {
          logout();
        } else if (data && data.email !== "") {
          setUserFollowing(() => data.following);
        }
      })
      .catch((err) => {
        logout();
      });
  }

  return (
    <div className="follower-container">
      <div className="people-list">
        {userFollowing &&
          userFollowing.length > 0 &&
          userFollowing.map((x) => (
            <NavLink to={"/profile/" + x.email + "/posts"}>
              <div className="profile" key={x.id}>
                <div className="profile-image">
                  <img
                    src={
                      x.imageType != null && x.imageType === "url"
                        ? x.imageName
                        : "/posts/profile.svg"
                    }
                    alt="profile-pic"
                  />
                </div>

                <div className="profile-name">
                  {x.username}
                  <div className="badge">
                    {x.verified && (
                      <img
                        className="verified"
                        src="/Verified/verified.svg"
                        alt="verified"
                      />
                    )}
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        {userFollowing &&
          userFollowing.length === 0 &&
          (showLoader ? (
            <div className="loader"></div>
          ) : (
            <div className="new-user">
              <br />
              Not following anyone
            </div>
          ))}
      </div>
    </div>
  );
}
