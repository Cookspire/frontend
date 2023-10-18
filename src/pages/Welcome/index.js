import { useContext, useEffect } from "react";
import { ToggleShowNavContext } from "../../context/NavDialogContext";

export default function Welcome() {
  const showNavBar = useContext(ToggleShowNavContext);

  useEffect(() => {
    showNavBar(true);
  }, []);

  return (
    <div className="welcome-content">
      <h1>This is a public content</h1>
    </div>
  );
}
