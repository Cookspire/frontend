import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LogoutUserContext, UserDataContext } from "../../context/UserContext";
import CloseModal from "../../hooks/CloseModal";
import "../styles/Navbar.css";

export default function Navbar() {
  const userData = useContext(UserDataContext);

  const [showProfile, setShowProfile] = useState(false);

  const [showQuickSettings, setShowQuickSettings] = useState(false);

  const logout = useContext(LogoutUserContext);

  const onClickOutside = CloseModal(() => {
    setShowQuickSettings(false);
  }, showProfile);

  useEffect(() => {
    if (
      userData &&
      userData.email !== "" &&
      localStorage.getItem("persist") !== ""
    ) {
      setShowProfile(true);
    }
  }, [userData]);

  return (
    <div className="cookspire-header">
      <nav className="nav">
        <a href="/" className="app-name">
          CookSpire
        </a>

        {showProfile ? (
          <div
            className="profile"
            onClick={() => {
              setShowQuickSettings((prev) => !prev);
            }}
            ref={onClickOutside}
          >
            <div className="round">KA</div>
            <div className="dropdown-logo">
              {!showQuickSettings ? (
                <div className="dropdown"></div>
              ) : (
                <div className="dropdown-change"></div>
              )}
            </div>

            {showQuickSettings && (
              <div className="nav-user-dropdown">
                <div className="menu-items">
                  <div className="menu-item">
                    <div className="item">User Settings</div>
                  </div>
                  <div className="menu-item">
                    <div className="item">
                      Dark Theme <input type="checkbox" />
                    </div>
                  </div>
                  <div className="menu-item" onClick={logout}>
                    <div className="item">Logout</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <ul>
            <NavLink to="/register">
              <li>Sign up</li>
            </NavLink>

            <NavLink to="/login">
              <li>Log In</li>
            </NavLink>
          </ul>
        )}
      </nav>
    </div>
  );
}
