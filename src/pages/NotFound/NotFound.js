import { useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ToggleShowNavContext } from "../../context/NavDialogContext";

const customStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
};

export default function NotFound() {
  const showNavBar = useContext(ToggleShowNavContext);
  const locationPath = useLocation();

  useEffect(() => {
    showNavBar(false);
  }, [locationPath]);

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
