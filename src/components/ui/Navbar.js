import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const loginNavigate = useNavigate();


  return (
    <div className="cookspire-header">
      <div className="header-content">
        <div className="header-left"><NavLink to="/">CookSpire</NavLink></div>
        <div className="header-center">
          <form>
            <input
              type="text"
              placeholder="Search Recipe..."
              id="reciepeFinder"
            />
          </form>
        </div>
        <div className="header-right">
          <button onClick={()=>loginNavigate("/login")}>Login</button>

          <button onClick={()=>loginNavigate("/register")}>Sign up</button>
        </div>
      </div>
    </div>
  );
}
