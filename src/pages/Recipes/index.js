import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import RecipeCard from "../../components/ui/RecipeCard";
import "./index.css";

export default function Recipe() {
  const { name } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (name && name.length === 0) {
      navigate("/explore");
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
            <input type="text" id="search" placeholder="Search Recipes" />
          </div>
        </div>
      </div>

      <div className="recipe-navigation">
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

      <div className="recipe-list">
        <RecipeCard />
      </div>
    </div>
  );
}
