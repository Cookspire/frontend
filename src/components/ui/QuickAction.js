import SearchIcon from "@mui/icons-material/Search";
import "../styles/QuickAction.css";
import { useState } from "react";
import CloseModal from "../../hooks/CloseModal";

export default function QuickAction() {
  const [globalSearch, setGlobalSearch] = useState("");

  const [showSuggestions, setShowSuggestions] = useState(false);

  const [suggestionsList, setSuggestionsList] = useState([
    "adam",
    "friends",
    "google",
    "ronaldo",
    "messi",
    "birynai",
  ]);

  const onClickOutside = CloseModal(() => {
    setShowSuggestions(false);
  }, true);

  return (
    <div className="quick-actions-content">
      <div className="search-content" ref={onClickOutside}>
        <div className="search-icon">
          <SearchIcon htmlColor="hsl(0, 0%, 0%, 0.67)" />
        </div>
        <div className="search-input" onClick={() => setShowSuggestions(true)}>
          <input
            type="text"
            id="search"
            maxLength={1000}
            autoComplete="off"
            placeholder="Search Cookspire"
          />
        </div>

        {showSuggestions && (
          <div className="search-suggestions">
            {suggestionsList.length === 0 && (
              <div className="suggestion-data">
                Try searching for people / recipes.
              </div>
            )}

            {suggestionsList.length > 0 &&
              suggestionsList.map((x, index) => (
                <div className="suggestion-list" key={index}>
                  <div className="suggestion-name">{x}</div>
                  
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="suggestions-content">
        <div className="suggestions-heading">Suggested Followers</div>
        <div className="suggestions-profile">
          <div className="profile-suggestions-info">
            <div className="profile-image">
              <img src="/posts/profile.svg" alt="profile" />
            </div>
            <div className="profile-name">Gordon Ramsay</div>
          </div>

          <div className="profile-action">
            <button>Follow</button>
          </div>
        </div>

        <div className="suggestions-profile">
          <div className="profile-suggestions-info ">
            <div className="profile-image">
              <img src="/posts/profile.svg" alt="profile" />
            </div>
            <div className="profile-name">Chef Ramsay</div>
          </div>

          <div className="profile-action">
            <button>Follow</button>
          </div>
        </div>

        <div className="suggestions-profile">
          <div className="profile-suggestions-info">
            <div className="profile-image">
              <img src="/posts/profile.svg" alt="profile" />
            </div>
            <div className="profile-name">Uncle Roger</div>
          </div>

          <div className="profile-action">
            <button>Follow</button>
          </div>
        </div>
      </div>
    </div>
  );
}
