import { createContext, useState } from "react";

import { useNavigate } from "react-router-dom";

export const UserDataContext = createContext();

export const UpdateUserDataContext = createContext();

export const LogoutUserContext = createContext();

export const UpdateWelcomeNotifyContext = createContext();

export function UserContext({ children }) {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(() => {
    let userDetails = JSON.parse(localStorage.getItem("persist"));
    if (userDetails) {
      return userDetails;
    } else return null;
  });

  const updateUserData = (data) => {
    setUserData(data);
  };

  const logoutUser = () => {
    setUserData(null);
    localStorage.removeItem("persist");
    navigate("/login");
  };

  return (
    <UserDataContext.Provider value={userData}>
      <UpdateUserDataContext.Provider value={updateUserData}>
        <LogoutUserContext.Provider value={logoutUser}>
          {children}
        </LogoutUserContext.Provider>
      </UpdateUserDataContext.Provider>
    </UserDataContext.Provider>
  );
}
