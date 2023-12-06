import SearchIcon from "@mui/icons-material/Search";
import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";
import { useContext, useEffect, useState } from "react";
import CloseModal from "../../hooks/CloseModal";
import useDebounce from "../../hooks/useDebounce";
import {
  APIResponse,
  BACKEND,
  JSON_HEADERS,
  NotificationType,
  PATH,
} from "../../environment/APIService";
import { UpdateNotificationContext } from "../../context/NotificationContext";

export const TYPE = {
  FUSION: "fusion",
  ASIAN: "asian",
  CHINESE: "chinese",
  CONTINENTAL: "continental",
  INDIAN: "indian",
  THAI: "thai",
  FRENCH: "french",
  ITALIAN: "italian",
  MEXICAN: "mexican",
  MIDDLE_EASTERN: "middle eastern",
  APPETIZER: "appetizer",
  BREAKFAST: "breakfast",
  DESSERT: "dessert",
  LUNCH: "lunch",
  SNACK: "snack",
  DINNER: "dinner",
};

export default function Recipe() {
  const navigate = useNavigate();

  const [globalSearch, setGlobalSearch] = useState("");

  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const [searchUsers, setSearchUsers] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchValue = useDebounce(globalSearch, 200);

  const setNotificationData = useContext(UpdateNotificationContext);

  useEffect(() => {
    cookspireSearch(debouncedSearchValue);
  }, [debouncedSearchValue]);

  const onClickOutside = CloseModal(() => {
    setShowSearchSuggestions(false);
  }, true);

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
          setSearchQuery(() => data.query);
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

  return (
    <div className="cuisine-container">
      <div className="global-search">
        <div className="search-content" ref={onClickOutside}>
          <div className="search-icon">
            <SearchIcon htmlColor="hsl(0, 0%, 0%, 0.67)" />
          </div>
          <div
            className="search-input"
            onClick={() => setShowSearchSuggestions(true)}
          >
            <input
              type="text"
              autoComplete="off"
              id="search"
              placeholder="Search Cookspire"
              maxLength={1000}
              onChange={(e) => {setShowSearchSuggestions(true);setGlobalSearch(e.target.value)}}
              value={globalSearch}
            />
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

              {searchQuery.length > 0 && (
                <NavLink to={"/search/recipe?q=" + searchQuery}>
                  <div className="query-suggestion-list">
                    <div className="suggestion-name">
                      <div className="query-suggestions-info">
                        <div className="query-image">
                          <SearchIcon htmlColor="hsl(240, 62%, 42%)" />
                        </div>
                        <div className="query-name">
                          Search for&nbsp;<b>{searchQuery}</b>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavLink>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="cuisine-navigation">Recipes</div>

      <div className="content-name">Cuisines</div>

      <div className="cuisine-list">
        <div
          className="cuisine-type"
          onClick={() => {
            navigate(`/explore/cuisine/${TYPE.ASIAN}`);
          }}
        >
          <img alt="asian" src="/Meals/asia.svg" title="asian" />
          <div className="cuisine-name">Asian</div>
        </div>

        <div
          className="cuisine-type"
          onClick={() => {
            navigate(`/explore/cuisine/${TYPE.CHINESE}`);
          }}
        >
          <img alt="chinese" src="/Meals/china.svg" />
          <div className="cuisine-name">Chinese</div>
        </div>

        <div
          className="cuisine-type"
          onClick={() => {
            navigate(`/explore/cuisine/${TYPE.CONTINENTAL}`);
          }}
        >
          <img alt="continental" src="/Meals/continental.svg" />
          <div className="cuisine-name">Continental</div>
        </div>

        <div
          className="cuisine-type"
          onClick={() => {
            navigate(`/explore/cuisine/${TYPE.INDIAN}`);
          }}
        >
          <img alt="indian" src="/Meals/india.svg" />
          <div className="cuisine-name">Indian</div>
        </div>

        <div
          className="cuisine-type"
          onClick={() => {
            navigate(`/explore/cuisine/${TYPE.FRENCH}`);
          }}
        >
          <img alt="french" src="/Meals/french.svg" />
          <div className="cuisine-name">French</div>
        </div>

        <div
          className="cuisine-type"
          onClick={() => {
            navigate(`/explore/cuisine/${TYPE.FUSION}`);
          }}
        >
          <img alt="american" src="/Meals/fusion.svg" title="fusion" />
          <div className="cuisine-name">Fusion</div>
        </div>

        <div
          className="cuisine-type"
          onClick={() => {
            navigate(`/explore/cuisine/${TYPE.ITALIAN}`);
          }}
        >
          <img alt="italian" src="/Meals/italy.svg" />
          <div className="cuisine-name">Italian</div>
        </div>

        <div
          className="cuisine-type"
          onClick={() => {
            navigate(`/explore/cuisine/${TYPE.MEXICAN}`);
          }}
        >
          <img alt="mexican" src="/Meals/mexico.svg" />
          <div className="cuisine-name"> Mexican</div>
        </div>

        <div
          className="cuisine-type"
          onClick={() => {
            navigate(`/explore/cuisine/${TYPE.MIDDLE_EASTERN}`);
          }}
        >
          <img alt="middle eastern" src="/Meals/middleEastern.svg" />
          <div className="cuisine-name">Middle Eastern</div>
        </div>

        <div
          className="cuisine-type"
          onClick={() => {
            navigate(`/explore/cuisine/${TYPE.THAI}`);
          }}
        >
          <img alt="thai" src="/Meals/thai.svg" />
          <div className="cuisine-name">Thai</div>
        </div>
      </div>

      <div className="content-name">Courses</div>

      <div className="cuisine-list">
        <div
          className="cuisine-type"
          onClick={() => {
            navigate(`/explore/course/${TYPE.APPETIZER}`);
          }}
        >
          <img alt="appetizer" src="/Meals/appetizer.svg" />
          <div className="cuisine-name">Appetizer</div>
        </div>

        <div
          className="cuisine-type"
          onClick={() => {
            navigate(`/explore/course/${TYPE.BREAKFAST}`);
          }}
        >
          <img alt="breakfast" src="/Meals/breakfast.svg" />
          <div className="cuisine-name">Breakfast</div>
        </div>

        <div
          className="cuisine-type"
          onClick={() => {
            navigate(`/explore/course/${TYPE.LUNCH}`);
          }}
        >
          <img alt="lunch" src="/Meals/lunch.svg" />
          <div className="cuisine-name">Lunch</div>
        </div>

        <div
          className="cuisine-type"
          onClick={() => {
            navigate(`/explore/course/${TYPE.SNACK}`);
          }}
        >
          <img alt="snack" src="/Meals/snack.svg" />
          <div className="cuisine-name">Snack</div>
        </div>

        <div
          className="cuisine-type"
          onClick={() => {
            navigate(`/explore/course/${TYPE.DESSERT}`);
          }}
        >
          <img alt="dessert" src="/Meals/dessert.svg" />
          <div className="cuisine-name">Dessert</div>
        </div>

        <div
          className="cuisine-type"
          onClick={() => {
            navigate(`/explore/course/${TYPE.DINNER}`);
          }}
        >
          <img alt="dinner" src="/Meals/dinner.svg" />
          <div className="cuisine-name">Dinner</div>
        </div>
      </div>
    </div>
  );
}
