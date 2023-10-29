import "../styles/Search.css";
import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
  return (
    <div className="quick-actions-content">
      <div className="search-content">
        <div className="search-icon">
          <SearchIcon htmlColor="hsl(0, 0%, 0%, 0.67)" />
        </div>
        <div className="search-input">
          <input type="text" id="search" placeholder="Search Cookspire" />
        </div>
      </div>
    </div>
  );
}
