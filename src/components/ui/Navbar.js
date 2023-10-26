
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LogoutUserContext, UserDataContext } from "../../context/UserContext";
import CloseModal from "../../hooks/CloseModal";
import "../styles/Navbar.css";
import HamburgerNav from "./HamburgerNav";

export default function Navbar() {
  const [windowDimensions, setHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    setHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  const userData = useContext(UserDataContext);

  const [showProfile, setShowProfile] = useState(false);

  const [showQuickSettings, setShowQuickSettings] = useState(false);

  const logout = useContext(LogoutUserContext);

  const onClickOutside = CloseModal(() => {
    setShowQuickSettings(false);
  }, showProfile);

  useEffect(() => {
    console.log(userData);
    if (
      userData &&
      userData.email !== "" &&
      localStorage.getItem("persist") !== ""
    ) {
      setShowProfile(true);
    }
  }, [userData]);

  const [sideNav, setSideNav] = useState(false);

  const toggleNav = () => {
    setSideNav((prev) => !prev);
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    if (windowDimensions.winWidth >= 1000) {
      setSideNav(false);
    }

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimensions]);

  return (
    <div className="cookspire-header">
      <nav className="nav">
        <div className="name-content">
          <a href="#" className="toggle-button" onClick={toggleNav}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </a>

          <a href="/" className="app-name">
            Cookspire
          </a>
        </div>


        {showProfile ? (
          <div
            className="profile"
            onClick={() => {
              setShowQuickSettings((prev) => !prev);
            }}
            ref={onClickOutside}
          >
            <div className="round">
              {userData?.username.charAt(0).toUpperCase() +
                userData?.username.charAt(1).toUpperCase()}
            </div>
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

      {sideNav && <HamburgerNav closeNav={setSideNav} />}
    </div>
  );
}
