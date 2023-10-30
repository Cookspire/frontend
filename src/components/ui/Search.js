import SearchIcon from "@mui/icons-material/Search";
import "../styles/Search.css";

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

      <div className="suggestions-content">
        <div className="suggestions-heading">Suggested Followers</div>
        <div className="suggestions-profile">
          <div className="profile-info">
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
          <div className="profile-info">
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
          <div className="profile-info">
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
