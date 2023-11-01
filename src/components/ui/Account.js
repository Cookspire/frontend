import { NavLink, Outlet } from "react-router-dom";
import "../styles/Account.css";

export default function Account() {
  return (
    <div className="account-settings">
      <div className="account-menu">
        <nav>
          <NavLink to="/profile/1/account/general">
            <div className="user-menu">General</div>
          </NavLink>

          <NavLink to="/profile/1/account/sensitive">
            <div className="user-menu">Password</div>
          </NavLink>

          <NavLink to="/profile/1/account/verification">
            <div className="user-menu">Verification</div>
          </NavLink>
        </nav>
      </div>

      <Outlet />
    </div>
  );
}
