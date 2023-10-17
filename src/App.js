import "./App.css";
import SideNav from "./components/ui/SideNav";
import AppRouter from "./routes/router";

import Navbar from "./components/ui/Navbar";

function App() {
  const hideNav = true;

  return (
    <div className="App">
      <Navbar />

      <div className="app-content">
        {hideNav && (
          <div className="left-container">
            <SideNav />
          </div>
        )}

        <div className="center-container">
          <AppRouter />
        </div>
      </div>
    </div>
  );
}

export default App;
