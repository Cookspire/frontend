import { useContext, useEffect, useState } from "react";
import { UpdateNotificationContext } from "../../context/NotificationContext";
import {
  LogoutUserContext,
  UpdateUserDataContext,
  UserDataContext,
} from "../../context/UserContext";
import {
  APIResponse,
  JSON_HEADERS,
  NotificationType,
  PATH,
  BACKEND,
} from "../../environment/APIService";
import "../styles/PasswordSettings.css";
import Notification from "./Notification";

export default function PasswordSettings() {
  const [passwordData, setPasswordData] = useState({
    oldPassword: { value: "", err: "" },
    newPassword: { value: "", err: "" },
    repeatPassword: { value: "", err: "" },
  });

  const updateUserData = useContext(UpdateUserDataContext);

  const setNotificationData = useContext(UpdateNotificationContext);

  const userData = useContext(UserDataContext);

  const [submit, setSubmit] = useState(false);

  const logout = useContext(LogoutUserContext);

  const [disablePasswordSave, setDisablePasswordSave] = useState(false);

  useEffect(() => {
    if (
      (passwordData.oldPassword.err &&
        passwordData.oldPassword.err.length > 0) ||
      (passwordData.newPassword.err &&
        passwordData.newPassword.err.length > 0) ||
      (passwordData.repeatPassword.err &&
        passwordData.repeatPassword.err.length > 0)
    ) {
      setDisablePasswordSave(true);
    } else if (
      passwordData.oldPassword.value.length === 0 ||
      passwordData.newPassword.value.length === 0 ||
      passwordData.repeatPassword.value.length === 0
    ) {
      setDisablePasswordSave(true);
    } else {
      setDisablePasswordSave(false);
    }
  }, [passwordData]);

  function updatePasswordData(event) {
    let { id, value } = event.target;

    switch (id) {
      case "oldPassword":
        if (
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(
            value
          )
        ) {
          setPasswordData((prev) => ({
            ...prev,
            [id]: { value: value, err: "" },
          }));

          if (
            !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(
              passwordData.newPassword.value
            )
          ) {
            setPasswordData((prev) => ({
              ...prev,
              newPassword: {
                value: prev.newPassword.value,
                err: "*Min: 8 , Max: 20. Must contain combination of lowerCase, upperCase, number , symbol",
              },
            }));
          } else if (value === passwordData.newPassword.value) {
            setPasswordData((prev) => ({
              ...prev,
              newPassword: {
                value: prev.newPassword.value,
                err: "*New password same as old password.",
              },
            }));
          } else {
            setPasswordData((prev) => ({
              ...prev,
              newPassword: {
                value: prev.newPassword.value,
                err: "",
              },
            }));
          }
        } else {
          setPasswordData((prev) => ({
            ...prev,
            [id]: {
              value: value,
              err: "*Min: 8 , Max: 20. Must contain combination of lowerCase, upperCase, number , symbol",
            },
          }));
        }
        break;
      case "newPassword":
        if (
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(
            value
          )
        ) {
          if (value === passwordData.oldPassword.value) {
            setPasswordData((prev) => ({
              ...prev,
              [id]: {
                value: value,
                err: "*New password same as old password.",
              },
            }));
          } else {
            setPasswordData((prev) => ({
              ...prev,
              [id]: { value: value, err: "" },
            }));
            if (value !== passwordData.repeatPassword.value) {
              setPasswordData((prev) => ({
                ...prev,
                repeatPassword: {
                  value: prev.repeatPassword.value,
                  err: "*Passwords aren't matching",
                },
              }));
            } else {
              setPasswordData((prev) => ({
                ...prev,
                repeatPassword: {
                  value: prev.repeatPassword.value,
                  err: "",
                },
              }));
            }
          }
        } else {
          setPasswordData((prev) => ({
            ...prev,
            [id]: {
              value: value,
              err: "*Min: 8 , Max: 20. Must contain combination of lowerCase, upperCase, number , symbol",
            },
          }));
        }

        break;

      case "repeatPassword":
        if (value.length > 0 && value === passwordData.newPassword.value) {
          setPasswordData((prev) => ({
            ...prev,
            [id]: { value: value, err: "" },
          }));
        } else {
          setPasswordData((prev) => ({
            ...prev,
            [id]: { value: value, err: "*Passwords aren't matching" },
          }));
        }
        break;

      default:
        setNotificationData(
          true,
          "You got us! Kindly raise a bug.",
          NotificationType.ERROR
        );
    }
  }

  async function persistUser() {
    fetch(BACKEND.API_URL + PATH.CREATE_USER, {
      method: "PUT",
      body: JSON.stringify({
        username: userData.username,
        email: userData.email,
        password: passwordData.newPassword.value,
        oldPassword: passwordData.oldPassword.value,
        country: userData.country,
        isVerified: false,
        bio: userData.bio,
        id: userData.id,
      }),
      headers: JSON_HEADERS,
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else if (response.status === 403 || response.status === 401) logout();
        else if (response.status === 400) return response.json();
        else return APIResponse.BAD_REQUEST;
      })
      .then((data) => {
        setSubmit(false);
        setPasswordData({
          oldPassword: { value: "", err: "" },
          newPassword: { value: "", err: "" },
          repeatPassword: { value: "", err: "" },
        });
        if (data !== APIResponse.BAD_REQUEST) {
          if (data.errorMessage) {
            setNotificationData(true, data.errorMessage, NotificationType.INFO);
          } else {
            updateUserData(data);
            setNotificationData(
              true,
              "Update Successful.",
              NotificationType.INFO
            );
          }
        } else {
          setNotificationData(true, "Bad API request", NotificationType.INFO);
        }
      })
      .catch((err) => {
        setSubmit(false);
        setNotificationData(
          true,
          "Oops you got us! Kindly raise a bug.",
          NotificationType.INFO
        );
        return console.log("Error Occured, Reason : " + err);
      });
  }

  const submitForm = (event) => {
    event.preventDefault();
    setSubmit((prev) => !prev);
    persistUser();
  };

  return (
    <div className="settings-content">
      <Notification />
      <div className="sensitive">
        <div className="heading">Password Settings</div>

        <div className="sub-heading">
          Change your password here. After saving, you'll be logged out.
        </div>

        <form className="general-form" onSubmit={submitForm}>
          <div className="field">
            <div className="field-label">
              <label htmlFor="oldPassword">Old Password</label>
            </div>

            <div className="field-input">
              <input
                id="oldPassword"
                type="password"
                value={passwordData.oldPassword.value}
                onChange={(e) => {
                  updatePasswordData(e);
                }}
                maxLength={1000}
              />
            </div>

            {passwordData.oldPassword.err && (
              <div className="error-area">
                <span className="err-msg">{passwordData.oldPassword.err}</span>
              </div>
            )}
          </div>

          <div className="field">
            <div className="field-label">
              <label htmlFor="newPassword">New Password</label>
            </div>

            <div className="field-input">
              <input
                id="newPassword"
                type="password"
                onChange={(e) => {
                  updatePasswordData(e);
                }}
                maxLength={1000}
                value={passwordData.newPassword.value}
              />
            </div>

            {passwordData.newPassword.err && (
              <div className="error-area">
                <span className="err-msg">{passwordData.newPassword.err}</span>
              </div>
            )}
          </div>

          <div className="field">
            <div className="field-label">
              <label htmlFor="repeatPassword">Repeat Password</label>
            </div>
            <div className="field-input">
              <input
                id="repeatPassword"
                type="password"
                onChange={(e) => {
                  updatePasswordData(e);
                }}
                maxLength={1000}
                value={passwordData.repeatPassword.value}
              />
            </div>

            {passwordData.repeatPassword.err && (
              <div className="error-area">
                <span className="err-msg">
                  {passwordData.repeatPassword.err}
                </span>
              </div>
            )}
          </div>

          <div className="action">
            {!submit && (
              <div className="field-button">
                <button type="submit" disabled={disablePasswordSave}>
                  Update Password
                </button>
              </div>
            )}

            {submit && (
              <div className=" field-button disabled">
                <button type="submit" className="disabled">
                  Updating Password...
                  <div className="side-loader">
                    <div className="loader"></div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
