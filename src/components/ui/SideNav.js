import { NavLink } from "react-router-dom";
import "../styles/SideNav.css";

export default function SideNav() {

  return (
    <div className="side-nav-container">
      <nav className="side-nav">
        <div className="menu-items">
          <NavLink to="/home">
            <div className="menu">Home</div>
          </NavLink>

          <NavLink to="/account">
            <div className="menu">Account</div>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
