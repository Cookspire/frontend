import { useContext, useEffect, useState } from "react";
import ReactDom from "react-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { UserDataContext } from "../../context/UserContext";
import CloseModal from "../../hooks/CloseModal";
import "../styles/HamburgerNav.css";

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
  const userData = useContext(UserDataContext);

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (
      userData &&
      userData.email !== "" &&
      localStorage.getItem("persist") !== ""
    ) {
      setIsLogged(true);
    }
  }, [userData]);

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
            <a href="#" className="toggle-button" onClick={closeHam}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </a>

            <a href="/" className="app-name">
              CookSpire
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
                    navigate("/account");
                  }}
                >
                  <NavLink to="/account">Account</NavLink>
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