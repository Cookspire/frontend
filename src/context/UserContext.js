import { createContext, useState } from "react";

import { useNavigate } from "react-router-dom";

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
    if (userDetails) {
      setHasLogged(true);
      return userDetails;
    } else return null;
  });

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
