import SideNav from "../../components/ui/SideNav";
import "./index.css";

export default function Home() {
  return (
    <div className="app-container">
      <div className="left-container">
        <SideNav />
      </div>

      <div className="center-container">This is feed page</div>
    </div>
  );
}
