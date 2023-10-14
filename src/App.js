import "./App.css";
import AppRouter from "./routes/router";
import SideNav from "./components/ui/SideNav";

function App() {


  return (
    <div className="App">
      <div className="app-container">
        <div className="app-content">
          <div className="left-container">
            <SideNav />
          </div>

          <div className="center-container">
            <AppRouter />
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
