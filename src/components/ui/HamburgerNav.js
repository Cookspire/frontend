import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useEffect, useState } from "react";
import ReactDom from "react-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { UserDataContext,LogoutUserContext } from "../../context/UserContext";
import CloseModal from "../../hooks/CloseModal";
import "../styles/HamburgerNav.css";
import { APIResponse, PATH, BACKEND } from "../../environment/APIService";


const OVERLAY = {
  backgroundColor: "rgb(0 0 0 / 70%)",
  zIndex: 1000,
  display: "flex",
  justifyContent: "flexstart",
  alignItems: "center",
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  flexDirection: "column",
};

export default function HamburgerNav({ closeNav }) {
  const [userData, setUserData] = useState();

  const userLogged = useContext(UserDataContext);

  const [isLogged, setIsLogged] = useState(false);

  const logout = useContext(LogoutUserContext);

  useEffect(() => {
    if (userLogged && userLogged.email != null) {
      fetchUserDetails(userLogged.email);
    }
  }, []);

  useEffect(() => {
    if (
      userData &&
      userData.email !== "" &&
      localStorage.getItem("persist") !== ""
    ) {
      setIsLogged(true);
    }
  }, [userData]);

  async function fetchUserDetails(email) {
    fetch(BACKEND.API_URL + PATH.FETCH_USER + email, {
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return APIResponse.UNAUTHORIZED;
      })
      .then((data) => {
        if (data !== APIResponse.UNAUTHORIZED && data.id !== null) {
          setUserData(data);
        }
      })
      .catch((err) => {
        logout();
      });
  }

  const navigate = useNavigate();

  const closeHam = () => {
    closeNav(false);
  };

  const hamRef = CloseModal(() => {
    closeHam();
  }, true);

  return ReactDom.createPortal(
    <div className="hamburger" style={OVERLAY}>
      <div className="hamburger-content" ref={hamRef}>
        <div className="ham-nav-container">
          <div className="name-content">
            <div className="toggle-button" onClick={closeHam}>
              <MenuIcon />
            </div>

            <a href="/" className="app-name">
              Cookspire
            </a>
          </div>

          <nav className="ham-nav">
            <ul>
              {isLogged && (
                <li
                  onClick={() => {
                    closeHam();
                    navigate("/home");
                  }}
                >
                  <NavLink to="/home">Home</NavLink>
                </li>
              )}

              <li
                onClick={() => {
                  closeHam();
                  navigate("/explore");
                }}
              >
                <NavLink to="/explore">Explore</NavLink>
              </li>

              <li
                onClick={() => {
                  closeHam();
                  navigate("/trending");
                }}
              >
                <NavLink to="/trending">Trending</NavLink>
              </li>

              {isLogged && (
                <li
                  onClick={() => {
                    closeHam();
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
      </div>
    </div>,
    document.getElementById("ham-portal")
  );
}
