import { useState } from "react";
import "../styles/Recipe.css";
import RecipeDetails from "./RecipeDetails";

export default function Recipe() {
  const [showRecipe, setShowRecipe] = useState(false);

  return (
    <>
      <div className="recipe-type" onClick={() => setShowRecipe(true)}>
        <div className="recipe-img">
          <img
            alt="coffee"
            src="https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          ></img>
        </div>

        <div className="recipe-name">Coffee</div>

        <div className="recipe-duration">Total time : 20min</div>
      </div>
      {showRecipe && <RecipeDetails handleClose={setShowRecipe}/>}
    </>
  );
}
