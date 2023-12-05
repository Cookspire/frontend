import { useState } from "react";
import "../styles/RecipeSearch.css";
import RecipeCard from "./RecipeCard";
import { useParams } from "react-router-dom";

export default function RecipeSearch() {
  const [recipeList, setRecipeList] = useState([]);

  const searchQuery= useParams();

  return (
    <div className="recipe-list">
      {recipeList.length > 0 &&
        recipeList.map((x) => {
          return (
            <RecipeCard key={x.id} recipeData={x} recipeCreation={false} />
          );
        })}

      {recipeList.length === 0 && (
        <div className="search-msg"><h2>No recipes found!</h2></div>
      )}
    </div>
  );
}
