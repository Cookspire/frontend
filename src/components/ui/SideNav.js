import { NavLink, useNavigate } from "react-router-dom";
import "../styles/SideNav.css";

export default function SideNav() {

  const navigate = useNavigate();

  return (
    <div className="side-nav-container">
      <nav className="side-nav">
        <ul>
          <li onClick={() => navigate("/home")}>
            <NavLink to="/home">Home</NavLink>
          </li>

          <li onClick={() => navigate("/account")}>
            <NavLink to="/account">Account</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
