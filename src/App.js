import { useContext } from "react";
import "./App.css";
import Navbar from "./components/ui/Navbar";
import SideNav from "./components/ui/SideNav";
import { ShowNavContext } from "./context/NavDialogContext";
import AppRouter from "./routes/router";

function App() {
  const showNav = useContext(ShowNavContext);

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
