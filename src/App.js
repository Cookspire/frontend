import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/ui/Navbar";
import SideNav from "./components/ui/SideNav";
import {
  ShowNavContext,
  ToggleShowNavContext,
} from "./context/NavDialogContext";
import AppRouter from "./routes/router";

function App() {
  const showNav = useContext(ShowNavContext);
  const showNavBar = useContext(ToggleShowNavContext);

  const locationPath = useLocation();

  useEffect(() => {
    if (
      locationPath.pathname === "/login" ||
      locationPath.pathname === "/register"
    ) {
      showNavBar(false);
    } else {
      showNavBar(true);
    }
  }, [locationPath]);

  return (
    <>
      <div className="App">
        {showNav && <Navbar />}

        <div className="app-content">
          <div className="app-container">
            {showNav && (
              <div className="left-container">
                <SideNav />
              </div>
            )}

            <div className="center-container">
              <AppRouter />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
