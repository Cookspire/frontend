import { useState } from "react";
import "../styles/PeopleSearch.css";
import { NavLink, useParams, useSearchParams } from "react-router-dom";

export default function PeopleSearch() {
  const [peopleList, setPeopleList] = useState([]);

  const searchQuery= useParams();

  const [searchParams, setSearchParams] = useSearchParams({ q: "" });

  return (
    <div className="recipe-list">
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
        <div className="search-msg"><h2>No Users found! {searchParams.get("q")}</h2></div>
      )}
    </div>
  );
}
