import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserDataContext, UserLoggedStatus } from "../../context/UserContext";
import "../styles/SideNav.css";

export default function SideNav() {
  const userData = useContext(UserDataContext);

  const isLogged = useContext(UserLoggedStatus);

  const navigate = useNavigate();

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
                navigate("/profile/" + userData.id + "/posts");
              }}
            >
              <NavLink to={"/profile/" + userData.id + "/posts"}>
                Profile
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
