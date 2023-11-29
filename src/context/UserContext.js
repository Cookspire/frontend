import { createContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  APIResponse,
  PATH,
  BACKEND,
} from "../environment/APIService";

export const UserDataContext = createContext();

export const UpdateUserDataContext = createContext();

export const LogoutUserContext = createContext();

export const UserLoggedStatus = createContext();

export const UpdateWelcomeNotifyContext = createContext();

export function UserContext({ children }) {
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
    fetch(BACKEND.API_URL + PATH.FETCH_USER + email, {
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return APIResponse.UNAUTHORIZED;
      })
      .then((data) => {
        if (data === APIResponse.UNAUTHORIZED) {
          logoutUser();
        } else if (data && data.email !== "") {
          setUserData(data);
        }
      })
      .catch((err) => {
        logoutUser();
      });
  }

  useEffect(() => {
   
    if (userData && userData.email !== "") {
      fetchUserDetails(userData?.email);
      console.log("In userCOntext loginc"+JSON.stringify(userData))
    }
   
  }, []);

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
