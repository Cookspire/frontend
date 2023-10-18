import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserDataContext } from "../../context/UserContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const userData = useContext(UserDataContext);

  const [showProfile, setShowProfile] = useState(false);

  const [showQuickSettings, setShowQuickSettings] = useState(false);

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
          <div className="profile">
            Kanishkar T{" "}
            <div
              className="dropdown-logo"
              onClick={() => {
                setShowQuickSettings((prev) => !prev);
              }}
            >
              <div className="dropdown"></div>
            </div>
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
