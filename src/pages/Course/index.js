import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import RecipeCard from "../../components/ui/RecipeCard";
import { UpdateNotificationContext } from "../../context/NotificationContext";
import {
  APIResponse,
  NotificationType,
  PATH,
  BACKEND,
} from "../../environment/APIService";
import "./index.css";

export default function Course() {
  const { name } = useParams();

  const navigate = useNavigate();

  const setNotificationData = useContext(UpdateNotificationContext);

  const [recipeList, setRecipeList] = useState([]);

  async function fetchRecipeByCourse(cuisine) {
    fetch(BACKEND.API_URL + PATH.FETCH_RECIPE_COURSE + cuisine, {
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else {
          console.log(response.text());
          return APIResponse.BAD_REQUEST;
        }
      })
      .then((data) => {
        if (data === APIResponse.UNAUTHORIZED) {
          setNotificationData(
            true,
            "Error occured while fetching user data.",
            NotificationType.INFO
          );
        } else if (data !== "") {
          setRecipeList(data);
        }
      })
      .catch((err) => {
        setNotificationData(
          true,
          "Error occured while fetching user data.",
          NotificationType.INFO
        );
      });
  }

  useEffect(() => {
    if (name && name.length === 0) {
      navigate("/explore");
    } else {
      fetchRecipeByCourse(name);
    }
  }, [name, navigate]);

  return (
    <div className="recipe-container">
      <div className="global-search">
        <div className="search-content">
          <div className="search-icon">
            <SearchIcon htmlColor="hsl(0, 0%, 0%, 0.67)" />
          </div>
          <div className="search-input">
            <input
              type="text"
              autoComplete="off"
              maxLength={1000}
              id="search"
              placeholder="Search Recipes"
            />
          </div>
        </div>
      </div>

      <div className="recipe-navigation">
        <div className="nav-data">
          <NavLink to="/explore">
            <div className="previous-page">Courses</div>
          </NavLink>

          <ArrowForwardIosIcon
            htmlColor="black"
            fontSize="6"
            className="forward-icon"
          />

          <div className="heading">
            {name.charAt(0).toUpperCase() + name.substring(1)}
          </div>
        </div>

        <div className="recipe-filter">
          <div className="filter-data">
            <div className="field">
              <select id="diet" type="text">
                <option value="choose">--Diet Plan--</option>
                <option value="choose">Vegiterian</option>
                <option value="choose">Non Vegiterian</option>
                <option value="choose">Eggeterian</option>
              </select>
            </div>
          </div>

          <div className="filter-data">
            <div className="field">
              <select id="diet" type="text">
                <option value="choose">--By time--</option>
                <option value="choose">&lt;10 mins</option>
                <option value="choose">10-20 mins</option>
                <option value="choose">20-40 mins</option>
                <option value="choose">&gt;40min</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="recipe-list">
        {recipeList.length > 0 &&
          recipeList.map((x) => {
            return (
              <RecipeCard key={x.id} recipeData={x} recipeCreation={false} />
            );
          })}
      </div>
    </div>
  );
}
