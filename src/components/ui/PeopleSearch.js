import { useContext, useEffect, useState } from "react";
import "../styles/PeopleSearch.css";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import RecipeSearch from "./RecipeSearch";
import {
  APIResponse,
  BACKEND,
  JSON_HEADERS,
  NotificationType,
  PATH,
} from "../../environment/APIService";
import { UpdateNotificationContext } from "../../context/NotificationContext";

export default function PeopleSearch() {
  const [peopleList, setPeopleList] = useState([]);

  const searchQuery = useParams();

  const [searchParams, setSearchParams] = useSearchParams({ q: "" });

  const setNotificationData = useContext(UpdateNotificationContext);

  useEffect(() => {
    peopleSearch(searchParams.get("q"));
  }, [searchParams]);

  async function peopleSearch(query) {
    fetch(BACKEND.API_URL + PATH.SEARCH_USERS, {
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
    
          setPeopleList(data);
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
    <div className="people-container">
      <div className="people-list">
        {peopleList.length > 0 &&
          peopleList.map((x) => (
            <NavLink to={"/profile/" + x.email + "/posts"}>
              <div className="profile" key={x.id}>
                <div className="profile-image">
                  <img src="/posts/profile.svg" alt="profile-pic" />
                </div>

                <div className="profile-name">{x.username}</div>
              </div>
            </NavLink>
          ))}

        {peopleList.length === 0 && (
          <div className="search-msg">
            <h2>No Users found for {searchParams.get("q")} .</h2>
          </div>
        )}
      </div>
    </div>
  );
}
