import SearchIcon from "@mui/icons-material/Search";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { UpdateNotificationContext } from "../../context/NotificationContext";
import { LogoutUserContext, UserDataContext } from "../../context/UserContext";
import {
  APIResponse,
  BACKEND,
  JSON_HEADERS,
  NotificationType,
  PATH,
} from "../../environment/APIService";
import CloseModal from "../../hooks/CloseModal";
import useDebounce from "../../hooks/useDebounce";
import "../styles/QuickAction.css";
import Notification from "./Notification";

export default function QuickAction() {
  const userLogged = useContext(UserDataContext);

  const [globalSearch, setGlobalSearch] = useState("");

  const debouncedSearchValue = useDebounce(globalSearch, 200);

  useEffect(() => {
    cookspireSearch(debouncedSearchValue);
  }, [debouncedSearchValue]);

  const [showLoader, setShowLoader] = useState(false);

  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const setNotificationData = useContext(UpdateNotificationContext);

  const [loggedUser, setLoggedUser] = useState();

  const logout = useContext(LogoutUserContext);

  const [searchUsers, setSearchUsers] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const onClickOutside = CloseModal(() => {
    setShowSearchSuggestions(false);
  }, true);

  useEffect(() => {
    fetchUserDetails(userLogged.email);
  }, []);

  async function fetchUserDetails(email) {
    fetch(BACKEND.API_URL + PATH.FETCH_USER + email, {
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else if (response.status === 401 || response.status === 403)
          return APIResponse.UNAUTHORIZED;
        else return APIResponse.BAD_REQUEST;
      })
      .then((data) => {
        if (data === APIResponse.BAD_REQUEST) {
          setNotificationData(
            true,
            "Error occured while fetching user data.",
            NotificationType.INFO
          );
        } else if (data === APIResponse.UNAUTHORIZED) {
          logout();
        } else if (data && data.email !== "") {
          setLoggedUser(data);
          fetchSuggestedUsers();
        }
      })
      .catch((err) => {
        setNotificationData(
          true,
          "Oops you got us! Raise a bug.",
          NotificationType.INFO
        );
      });
  }

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

  async function fetchSuggestedUsers() {
    setShowLoader(true);
    fetch(BACKEND.API_URL + PATH.SUGGESTED_USER + userLogged.email, {
      method: "POST",
      headers: JSON_HEADERS,
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else {
          return APIResponse.BAD_REQUEST;
        }
      })
      .then((data) => {
        setShowLoader(false);
        if (data !== APIResponse.BAD_REQUEST) {
          setSuggestedUsers(data);
        } else {
          setNotificationData(
            true,
            "Unable to fetch suggested users.",
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
        return console.log("Error Occured, Reason : " + err);
      });
  }

  async function followUser(followerId, shouldFollow) {
    fetch(BACKEND.API_URL + PATH.FOLLOW_USER, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({
        followerId: loggedUser.id,
        followeeId: followerId,
        followUser: shouldFollow,
      }),
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return APIResponse.BAD_REQUEST;
      })
      .then((data) => {
        if (data !== APIResponse.BAD_REQUEST) {
          const newList = suggestedUsers.map((x) => {
            if (x.id === followerId) {
              const updatedItem = { ...x, isFollowing: shouldFollow };
              return updatedItem;
            } else return x;
          });
          setSuggestedUsers(newList);
        } else {
          setNotificationData(
            true,
            "Unable to follow user. Kindly raise a bug!",
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
        return console.log("Error Occured, Reason : " + err);
      });
  }

  const submitFollowUser = (e, followerId, shouldFollow) => {
    e.preventDefault();
    followUser(followerId, shouldFollow);
  };

  return (
    <div className="quick-actions-content">
      <Notification />
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
            id="search"
            maxLength={1000}
            autoComplete="off"
            placeholder="Search Cookspire"
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
              <NavLink to={"/search/recipe?q=" + searchQuery} onClick={()=>setShowSearchSuggestions(false)}>
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

      <div className="suggestions-content">
        <div className="suggestions-heading">Suggested Followers</div>

        {suggestedUsers && suggestedUsers.length > 0 ? (
          suggestedUsers.map((x) => (
            <div className="suggestions-profile" key={x.id}>
              <div className="profile-suggestions-info">
                <div className="profile-image">
                  <img src="/posts/profile.svg" alt="profile" />
                </div>
                <div className="profile-name">
                  <NavLink to={"/profile/" + x.email + "/posts"}>
                    {x.username}
                  </NavLink>
                </div>
              </div>

              {!x.isFollowing && (
                <div className="profile-action">
                  <button
                    onClick={(e) => submitFollowUser(e, x.id, !x.isFollowing)}
                  >
                    Follow
                  </button>
                </div>
              )}

              {x.isFollowing && (
                <div className="profile-action">
                  <button
                    onClick={(e) => submitFollowUser(e, x.id, !x.isFollowing)}
                  >
                    Following
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="suggestions-profile">
            {showLoader ? (
              <div className="center-loader">
                <div className="loader"></div>
              </div>
            ) : (
              <div className="done-msg">You are all caught up!</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
