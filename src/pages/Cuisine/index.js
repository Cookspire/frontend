import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import RecipeCard from "../../components/ui/RecipeCard";
import { UpdateNotificationContext } from "../../context/NotificationContext";
import {
  APIResponse,
  BACKEND,
  NotificationType,
  PATH,
} from "../../environment/APIService";
import "./index.css";

export default function Cuisine() {
  const { name } = useParams();

  const navigate = useNavigate();

  const setNotificationData = useContext(UpdateNotificationContext);

  const [recipeList, setRecipeList] = useState([]);

  const [maxPageNumber, setMaxPageNumber] = useState(0);

  const [currentPageNumber, setCurrentPageNumber] = useState(0);

  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    if (name && name.length === 0) {
      navigate("/explore");
    } else {
      fetchRecipeByCuisine(name);
    }
  }, [name, navigate]);

  useEffect(() => {
    if (maxPageNumber > 0 && currentPageNumber >= maxPageNumber) {
      setShowMore(false);
    }
  }, [maxPageNumber, currentPageNumber]);

  async function fetchRecipeByCuisine(cuisine) {
    fetch(
      BACKEND.API_URL +
        PATH.FETCH_RECIPE_CUISINE +
        cuisine +
        "&pageNumber=" +
        currentPageNumber,
      {
        method: "POST",
      }
    )
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
          const responseList = data.recipe;
          setRecipeList((prevList) => [...prevList, ...responseList]);
          setMaxPageNumber(() => data.maxPageNumber);
          setCurrentPageNumber((prev) => prev + 1);
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

  const loadMoreData = () => {
    if (currentPageNumber <= maxPageNumber) {
      fetchRecipeByCuisine(name);
    }
  };

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
              id="search"
              maxLength={1000}
              placeholder="Search Recipes"
            />
          </div>
        </div>
      </div>

      <div className="recipe-navigation">
        <div className="nav-data">
          <NavLink to="/explore">
            <div className="previous-page">Cuisines</div>
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
        {recipeList &&
          recipeList.length > 0 &&
          recipeList.map((x) => {
            return <RecipeCard key={x.id} recipeData={x} />;
          })}
      </div>

      {showMore && (
        <div className="data-loader-action">
          <button onClick={loadMoreData}> Show more</button>
        </div>
      )}
    </div>
  );
}
