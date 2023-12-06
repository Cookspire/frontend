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

  useEffect(() => {
    recipeSearch(searchParams.get("q"));
  }, [searchParams]);

  async function recipeSearch(query) {
    fetch(BACKEND.API_URL + PATH.SEARCH_RECIPE, {
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
          setRecipeList(data)
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
    <div className="recipe-list">
      {recipeList.length > 0 &&
        recipeList.map((x) => {
          return (
            <RecipeCard key={x.recipe.id} recipeData={x.recipe} recipeCreation={false} />
          );
        })}

      {recipeList.length === 0 && (
        <div className="search-msg">
          <h2>No recipes found! {searchParams.get("q")}</h2>
        </div>
      )}
    </div>
  );
}
