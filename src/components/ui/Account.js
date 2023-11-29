import { NavLink, Outlet } from "react-router-dom";
import "../styles/Account.css";
import { useContext, useEffect, useState } from "react";
import { LogoutUserContext, UserDataContext } from "../../context/UserContext";
import { APIResponse, BACKEND, PATH } from "../../environment/APIService";

export default function Account() {
  const userLogged = useContext(UserDataContext);

  const logout = useContext(LogoutUserContext);

  const [userData, setUserData] = useState();

  useEffect(() => {
    if (userLogged && userLogged.email != null) {
      fetchUserDetails(userLogged.email);
    } else {
      logout();
    }
  }, []);

  async function fetchUserDetails(email) {
    fetch(BACKEND.API_URL + PATH.FETCH_USER + email, {
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return APIResponse.UNAUTHORIZED;
      })
      .then((data) => {
        if (data === APIResponse.UNAUTHORIZED) {
          logout();
        } else if (data && data.email !== "") {
          setUserData(data);
        }
      })
      .catch((err) => {
        logout();
      });
  }
  return userData && userData.id === null ? (
    <>Loading...</>
  ) : (
    <div className="account-settings">
      <div className="account-menu">
        {userData && userData.id && (
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
        )}
      </div>

      <Outlet />
    </div>
  );
}
