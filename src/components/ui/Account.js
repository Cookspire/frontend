import { NavLink, Outlet } from "react-router-dom";
import "../styles/Account.css";
import { useContext } from "react";
import { UserDataContext } from "../../context/UserContext";

export default function Account() {
  const userData = useContext(UserDataContext);

  return (
    <div className="account-settings">
      <div className="account-menu">
        <nav>
          <NavLink to={"/profile/" + userData.id + "/account/general"}>
            <div className="user-menu">General</div>
          </NavLink>

          <NavLink to={"/profile/" + userData.id + "/account/sensitive"}>
            <div className="user-menu">Password</div>
          </NavLink>

          {/* <NavLink to={"/profile/" + userData.id + "/account/verification"}>
            <div className="user-menu">Verification</div>
          </NavLink> */}
        </nav>
      </div>

      <Outlet />
    </div>
  );
}
