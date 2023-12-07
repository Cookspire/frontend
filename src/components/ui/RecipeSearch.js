import { useContext, useEffect, useState } from "react";
import "../styles/RecipeSearch.css";
import RecipeCard from "./RecipeCard";
import { useParams, useSearchParams } from "react-router-dom";
import {
  APIResponse,
  BACKEND,
  JSON_HEADERS,
  NotificationType,
  PATH,
} from "../../environment/APIService";
import { UpdateNotificationContext } from "../../context/NotificationContext";

export default function RecipeSearch() {
  const [recipeList, setRecipeList] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams({ q: "" });

  const setNotificationData = useContext(UpdateNotificationContext);

  const [maxPageNumber, setMaxPageNumber] = useState(0);

  const [currentPageNumber, setCurrentPageNumber] = useState(0);

  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    recipeSearch(searchParams.get("q"));
  }, [searchParams]);

  useEffect(() => {
    if (maxPageNumber > 0 && currentPageNumber >= maxPageNumber) {
      setShowMore(false);
    }
  }, [maxPageNumber, currentPageNumber]);

  async function recipeSearch(query) {
    fetch(BACKEND.API_URL + PATH.SEARCH_RECIPE, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({
        query: query,
        currentPageNumber: currentPageNumber,
      }),
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return APIResponse.BAD_REQUEST;
      })
      .then((data) => {
        if (data !== APIResponse.BAD_REQUEST) {
          const responseList = data.recipe;
          setRecipeList((prevList) => [...prevList, ...responseList]);
          setMaxPageNumber(() => data.maxPageNumber);
          setCurrentPageNumber((prev) => prev + 1);
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

  const loadMoreData = () => {
    if (currentPageNumber <= maxPageNumber) {
      recipeSearch(searchParams.get("q"));
    }
  };

  return (
    <div className="recipe-search-container">
      <div className="recipe-list">
        {recipeList.length > 0 &&
          recipeList.map((x) => {
            return (
              <RecipeCard
                key={x.id}
                recipeData={x}
                recipeCreation={false}
              />
            );
          })}

        {recipeList.length === 0 && (
          <div className="search-msg">
            <h2>No recipes found for {searchParams.get("q")} .</h2>
          </div>
        )}
      </div>
      {showMore && recipeList.length > 0 && (
        <div className="data-loader-action">
          <button onClick={loadMoreData}> Show more</button>
        </div>
      )}
    </div>
  );
}
