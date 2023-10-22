import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserDataContext } from "../../context/UserContext";
import "../styles/SideNav.css";

export default function SideNav() {
  const userData = useContext(UserDataContext);

  const [isLogged, setIsLogged] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      userData &&
      userData.email !== "" &&
      localStorage.getItem("persist") !== ""
    ) {
      setIsLogged(true);
    }
  }, [userData]);

  return (
    <div className="side-nav-container">
      <nav className="side-nav">
        <ul>
          {isLogged && (
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

          {isLogged && (
            <li
              onClick={() => {
                navigate("/account");
              }}
            >
              <NavLink to="/account">Account</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
