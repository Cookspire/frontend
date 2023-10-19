import ReactDom from "react-dom";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/HamburgerNav.css";
import CloseModal from "../../hooks/CloseModal";

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
              <li
                onClick={() => {
                  closeHam();
                  navigate("/home");
                }}
              >
                <NavLink to="/home">Home</NavLink>
              </li>

              <li
                onClick={() => {
                  closeHam();
                  navigate("/account");
                }}
              >
                <NavLink to="/account">Account</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>,
    document.getElementById("ham-portal")
  );
}
