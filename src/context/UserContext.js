import { createContext, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  APIResponse,
  NotificationType,
  PATH,
  URL,
} from "../environment/APIService";
import { UpdateNotificationContext } from "./NotificationContext";

export const UserDataContext = createContext();

export const UpdateUserDataContext = createContext();

export const LogoutUserContext = createContext();

export const UserLoggedStatus = createContext();

export const UpdateWelcomeNotifyContext = createContext();

export function UserContext({ children }) {
  const setNotificationData = useContext(UpdateNotificationContext);

  const navigate = useNavigate();

  const [hasLogged, setHasLogged] = useState(false);

  const [userData, setUserData] = useState(() => {
    let userDetails = JSON.parse(localStorage.getItem("persist"));
    if (userDetails && userDetails.email !== "") {
      setHasLogged(true);
      fetchUserDetails(userDetails.email);
    } else return null;
  });

  async function fetchUserDetails(email) {
    fetch(URL.API_URL + PATH.FETCH_USER + email, {
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else {
          console.log(response.text());
          return APIResponse.BAD_REQUEST;
        }
      })
      .then((data) => {
        if (data === APIResponse.UNAUTHORIZED) {
          setNotificationData(
            true,
            "Error occured while fetching user data.",
            NotificationType.INFO
          );
        } else if (data && data.email !== "") {
          setUserData(data);
        }
      })
      .catch((err) => {
        setNotificationData(
          true,
          "Error occured while fetching user data.",
          NotificationType.INFO
        );
      });
  }

  useEffect(() => {
    if (userData && userData.email !== "") {
      fetchUserDetails(userData?.email);
    }
  }, []);

  useEffect(() => {
    console.log("here is the userData:" + JSON.stringify(userData));
  }, [userData]);

  const updateUserData = (data) => {
    setUserData(data);
    let userDetails = JSON.parse(localStorage.getItem("persist"));
    if (userDetails) {
      setHasLogged(true);
    }
  };

  const logoutUser = () => {
    setUserData(null);
    setHasLogged(false);
    localStorage.removeItem("persist");
    navigate("/login");
  };

  return (
    <UserDataContext.Provider value={userData}>
      <UpdateUserDataContext.Provider value={updateUserData}>
        <LogoutUserContext.Provider value={logoutUser}>
          <UserLoggedStatus.Provider value={hasLogged}>
            {children}
          </UserLoggedStatus.Provider>
        </LogoutUserContext.Provider>
      </UpdateUserDataContext.Provider>
    </UserDataContext.Provider>
  );
}
