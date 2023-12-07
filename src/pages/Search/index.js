import SearchIcon from "@mui/icons-material/Search";
import { useContext, useEffect, useState } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { UpdateNotificationContext } from "../../context/NotificationContext";
import {
  APIResponse,
  BACKEND,
  JSON_HEADERS,
  NotificationType,
  PATH,
} from "../../environment/APIService";
import CloseModal from "../../hooks/CloseModal";
import useDebounce from "../../hooks/useDebounce";
import "./index.css";

export default function Search() {
  const [globalSearch, setGlobalSearch] = useState("");

  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const [searchUsers, setSearchUsers] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [searchParams, setSearchParams] = useSearchParams({ q: "" });

  const setNotificationData = useContext(UpdateNotificationContext);

  const debouncedSearchValue = useDebounce(globalSearch, 200);

  const navigate = useNavigate();

  const onClickOutside = CloseModal(() => {
    setShowSearchSuggestions(false);
  }, true);

  useEffect(() => {
    setGlobalSearch(searchParams.get("q"));
  }, [searchParams]);

  useEffect(() => {
    cookspireSearch(debouncedSearchValue);
  }, [debouncedSearchValue]);

  const handleGlobalSearchChange = (e) => {
    setGlobalSearch(e.target.value);
    //setSearchParams((prev) => ({ ...prev, q: e.target.value }));
  };

  async function cookspireSearch(query) {
    fetch(BACKEND.API_URL + PATH.SEARCH_COOKSPIRE, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return APIResponse.BAD_REQUEST;
      })
      .then((data) => {
        if (data !== APIResponse.BAD_REQUEST) {
          setSearchUsers(() => data.users.slice(0, 7));
          setSearchQuery(data.recipe);
          if (data.query.length > 0)
            setSearchQuery((prev) => [...prev, data.query]);
        } else {
          setNotificationData(
            true,
            "Search function not working. Kindly check the input.",
            NotificationType.INFO
          );
        }
      })
      .catch((err) => {
        setNotificationData(
          true,
          "Oops you got us! Kindly raise a bug.",
          NotificationType.INFO
        );
      });
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSearchSuggestions(false);
    navigate("/search/recipe?q=" + globalSearch);
  };

  return (
    <div className="search-container">
      <div className="global-search">
        <div className="search-content" ref={onClickOutside}>
          <div className="search-icon">
            <SearchIcon htmlColor="hsl(0, 0%, 0%, 0.67)" />
          </div>
          <div
            className="search-input"
            onClick={() => setShowSearchSuggestions(true)}
          >
            <form onSubmit={(e) => handleSearchSubmit(e)}>
              <input
                type="text"
                autoComplete="off"
                id="search"
                placeholder="Search Cookspire"
                maxLength={1000}
                onChange={(e) => {
                  setShowSearchSuggestions(true);
                  handleGlobalSearchChange(e);
                }}
                value={globalSearch}
              />
              <button
                style={{ display: "none" }}
                type="submit"
                onSubmit={(e) => handleSearchSubmit(e)}
              ></button>
            </form>
          </div>

          {searchUsers && showSearchSuggestions && (
            <div className="search-suggestions">
              {searchUsers.length === 0 && searchQuery.length === 0 && (
                <div className="suggestion-data">
                  Try searching for people / recipes.
                </div>
              )}

              {searchUsers.length > 0 &&
                searchUsers.map((x, index) => (
                  <NavLink to={"/profile/" + x.email + "/posts"}>
                    <div className="suggestion-list" key={index}>
                      <div className="suggestion-name">
                        <div className="profile-suggestions-info">
                          <div className="profile-image">
                            <img src="/posts/profile.svg" alt="profile" />
                          </div>
                          <div className="profile-name">{x.username}</div>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                ))}

              {searchQuery.length > 0 &&
                searchQuery.map((x, index) => (
                  <NavLink
                    to={"/search/recipe?q=" + x}
                    onClick={() => setShowSearchSuggestions(false)}
                    key={index}
                  >
                    <div className="query-suggestion-list">
                      <div className="suggestion-name">
                        <div className="query-suggestions-info">
                          <div className="query-image">
                            <SearchIcon htmlColor="hsl(240, 62%, 42%)" />
                          </div>
                          <div className="query-name">
                            Search for&nbsp;<b>{x}</b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                ))}
            </div>
          )}
        </div>
      </div>

      <div className="search-section">
        <nav>
          <NavLink to={"/search/recipe?q=" + searchParams.get("q")}>
            <div className="search-nav">Recipes</div>
          </NavLink>

          <NavLink to={"/search/people?q=" + searchParams.get("q")}>
            <div className="search-nav">People</div>
          </NavLink>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}
