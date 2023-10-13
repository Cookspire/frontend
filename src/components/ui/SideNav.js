import { NavLink } from "react-router-dom";
import "../styles/SideNav.css";

export default function SideNav() {
  return (
    <div className="side-nav-container">
      <div className="side-menu-content">
        <nav>
          <NavLink to="/home">
            <div className="side-menu-appName">CookSpire</div>
          </NavLink>

          <NavLink to="/home">
            <div className="side-menu-item">Home</div>
          </NavLink>

          <NavLink to="/account">
            <div className="side-menu-item">Account</div>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
