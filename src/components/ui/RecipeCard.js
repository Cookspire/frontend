import { useState } from "react";
import { createPortal } from "react-dom";
import "../styles/RecipeCard.css";
import RecipeDetails from "./RecipeDetails";

export default function RecipeCard({recipeData, recipeCreation}) {
  const [showRecipe, setShowRecipe] = useState(false);

  const [recipeDetails, setRecipeDetails]= useState(recipeData);

  return (
    <>
      <div className="recipe-type" title={recipeDetails.name.trim()} onClick={() => setShowRecipe(true)}>
        <div className="recipe-img">
          <img
            alt={recipeDetails.name.trim()}
            src={recipeDetails.imageType==='url'?recipeDetails.imageName:""}
          ></img>
         {/* add default image!! */}
        </div>

        <div className="recipe-name"><p className="trim-title">{recipeDetails.name.trim()}</p></div>

        <div className="recipe-duration">Total time : {recipeDetails.cook_time_mins}min</div>
      </div>
      {showRecipe &&
        createPortal(
          <RecipeDetails handleClose={setShowRecipe} createRecipe={false}/>,
          document.getElementById("recipe-details-portal")
        )}
    </>
  );
}