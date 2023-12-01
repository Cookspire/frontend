import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserDataContext } from "../../context/UserContext";
import "../styles/SideNav.css";
import { APIResponse, BACKEND, NotificationType, PATH } from "../../environment/APIService";
import Notification from "./Notification";
import { UpdateNotificationContext } from "../../context/NotificationContext";

export default function SideNav() {
  const userLogged = useContext(UserDataContext);

  const navigate = useNavigate();

  const setNotificationData = useContext(UpdateNotificationContext);

  const [userData, setUserData] = useState();

  useEffect(() => {
    if (userLogged && userLogged.email != null) {
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
        if (data !== APIResponse.UNAUTHORIZED && data.id !== null) {
          setUserData(data);
        }
      })
      .catch((err) => {
        setNotificationData(
          true,
          "Opps error occured while fetching user data.",
          NotificationType.INFO
        );
      });
  }

  return (
    <>
      <Notification />
      <div className="side-nav-container">
        <nav className="side-nav">
          <ul>
            {userData && userData.email != null && (
              <li
                onClick={() => {
                  navigate("/home");
                }}
              >
                <NavLink to="/home">Home</NavLink>
              </li>
            )}

            <li
              onClick={() => {
                navigate("/explore");
              }}
            >
              <NavLink to="/explore">Explore</NavLink>
            </li>

            <li
              onClick={() => {
                navigate("/trending");
              }}
            >
              <NavLink to="/trending">Trending</NavLink>
            </li>

            {userData && userData.email != null && (
              <li
                onClick={() => {
                  navigate("/profile/" + userData.email + "/posts");
                }}
              >
                <NavLink to={"/profile/" + userData.email + "/posts"}>
                  Profile
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}
