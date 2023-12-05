import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./index.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseModal from "../../hooks/CloseModal";

export default function Search() {
  const navigate = useNavigate();

  const [globalSearch, setGlobalSearch] = useState("");

  const [showSuggestions, setShowSuggestions] = useState(false);

  const [suggestionsList, setSuggestionsList] = useState([]);

  const onClickOutside = CloseModal(() => {
    setShowSuggestions(false);
  }, true);

  return (
    <div className="cuisine-container">
      <div className="global-search">
        <div className="search-content" ref={onClickOutside}>
          <div className="search-icon">
            <SearchIcon htmlColor="hsl(0, 0%, 0%, 0.67)" />
          </div>
          <div
            className="search-input"
            onClick={() => setShowSuggestions(true)}
          >
            <input
              type="text"
              autoComplete="off"
              id="search"
              placeholder="Search Cookspire"
              maxLength={1000}
              onChange={(e) => setGlobalSearch(e.target.value)}
              value={globalSearch}
            />
          </div>
        </div>
        {showSuggestions && (
          <div className="search-suggestions">
            {suggestionsList.length === 0 && (
              <div className="suggestion-data">
                Try searching for people / recipes.
              </div>
            )}
          </div>
        )}
      </div>

      <div className="search-section">
        <nav>
          <NavLink to={"/search/recipe"}>
            <div className="search-nav">Recipes</div>
          </NavLink>
          <NavLink to={"/search/people"}>
            <div className="search-nav">People</div>
          </NavLink>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}
