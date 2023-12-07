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

  const [showLoader, setShowLoader] = useState(false);

  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    console.log("change in search params!!");
    recipeSearch(searchParams.get("q"), true);
  }, [searchParams.get("q")]);

  useEffect(() => {
    if (maxPageNumber > 0 && currentPageNumber >= maxPageNumber) {
      setShowMore(false);
    }
  }, [maxPageNumber, currentPageNumber]);

  async function recipeSearch(query, refreshData) {
    if (refreshData) setMaxPageNumber(0);
    setShowLoader(true);
    fetch(BACKEND.API_URL + PATH.SEARCH_RECIPE, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({
        query: query,
        currentPageNumber: !refreshData ? currentPageNumber : 0,
      }),
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return APIResponse.BAD_REQUEST;
      })
      .then((data) => {
        setShowLoader(false);
        if (data !== APIResponse.BAD_REQUEST) {
          const responseList = data.recipe;
          if (!refreshData)
            setRecipeList((prevList) => [...prevList, ...responseList]);
          else setRecipeList(responseList);
          setMaxPageNumber(data.maxPageNumber);
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
      recipeSearch(searchParams.get("q"), false);
    }
  };

  return (
    <div className="recipe-search-container">
      <div className="recipe-list">
        {recipeList.length > 0 &&
          recipeList.map((x) => {
            return (
              <RecipeCard key={x.id} recipeData={x} recipeCreation={false} />
            );
          })}

        {recipeList.length === 0 && !showLoader && (
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

      {showLoader && recipeList.length === 0 && <div className="loader"></div>}
    </div>
  );
}
