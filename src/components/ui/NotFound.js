import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
    ShowNavContext,
    ToggleShowNavContext,
} from "../../context/NavDialogContext";

const customStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
};

export default function NotFound() {
  const showNavBar = useContext(ToggleShowNavContext);
  const showNav = useContext(ShowNavContext);

  useEffect(() => {
    if (showNav) {
      showNavBar(false);
    }
  }, []);

  return (
    <div className="error-page" style={customStyle}>
      <h1>Oops... You are lost</h1>
      &nbsp;
      <NavLink to="/" style={{ color: "blue" }}>
        Redirect to CookSpire
      </NavLink>
    </div>
  );
}
