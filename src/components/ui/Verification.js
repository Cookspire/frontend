import { useContext, useEffect, useState } from "react";
import { UpdateNotificationContext } from "../../context/NotificationContext";
import { LogoutUserContext, UserDataContext } from "../../context/UserContext";
import {
  APIResponse,
  BACKEND,
  NotificationType,
  PATH,
} from "../../environment/APIService";
import "../styles/Verification.css";
export default function Verification() {
  const userLogged = useContext(UserDataContext);

  const logout = useContext(LogoutUserContext);

  const [loggedUser, setLoggedUser] = useState();

  const setNotificationData = useContext(UpdateNotificationContext);

  useEffect(() => {
    if (userLogged && userLogged.email != null) {
      fetchUserDetails(userLogged.email);
    }
  }, [userLogged]);

  async function deleteUser(id) {
   
    fetch(BACKEND.API_URL + PATH.DELETE_USER +id , {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return APIResponse.BAD_REQUEST;
      })
      .then((data) => {
        if (data === APIResponse.BAD_REQUEST) {
          setNotificationData(
            true,
            "Error occured while fetching user data.",
            NotificationType.INFO
          );
        } else {
          logout();
          setNotificationData(
            true,
            "Account deleted Successfully.",
            NotificationType.INFO
          );
        }
      })
      .catch((err) => {
        setNotificationData(
          true,
          "Oops you got us! Raise a bug.",
          NotificationType.INFO
        );
      });
  }

  async function fetchUserDetails(email) {
    fetch(BACKEND.API_URL + PATH.FETCH_USER + email, {
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return APIResponse.BAD_REQUEST;
      })
      .then((data) => {
        if (data === APIResponse.BAD_REQUEST) {
          setNotificationData(
            true,
            "Error occured while fetching user data.",
            NotificationType.INFO
          );
        } else if (data && data.email !== "") {
          setLoggedUser(data);
        }
      })
      .catch((err) => {
        setNotificationData(
          true,
          "Oops you got us! Raise a bug.",
          NotificationType.INFO
        );
      });
  }

  const deleteUserControl = (e) => {
    e.preventDefault();
    const value = prompt(
      "Are you sure to delete the account? If yes then type in your email"
    );
    if (value === loggedUser.email) {
      deleteUser(loggedUser.id)
    }
  };

  return (
    <div className="verify-content">
      <div className="heading">Delete your account</div>

      <div className="explanation">
        Deleting your account deletes all your connections & posts. It cannot be
        recoverd back.
        <br />
        Kindly let us know, what could have been done better!
      </div>

      <div className="action">
        <button onClick={deleteUserControl}>Delete Account</button>
      </div>
    </div>
  );
}
