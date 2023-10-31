import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import "./index.css";

export const TYPE = {
  AMERICAN: "american",
  ASIAN: "asian",
  CHINESE: "chinese",
  CONTINENTAL: "continental",
  INDIAN: "indian",
  JAPANESE: "japanese",
  FRENCH: "french",
  ITALIAN: "italian",
  MEXICAN: "mexican",
  SPANISH: "spanish",
  BREAKFAST: "breakfast",
  BRUNCH: "brunch",
  LUNCH: "lunch",
  SNACKS: "snacks",
  DINNER: "dinner",
  LATENIGHT: "lateNight",
};

export default function Cuisine() {
  const navigate = useNavigate();

  return (
    <div className="cuisine-container">
      <div className="global-search">
        <div className="search-content">
          <div className="search-icon">
            <SearchIcon htmlColor="hsl(0, 0%, 0%, 0.67)" />
          </div>
          <div className="search-input">
            <input type="text" id="search" placeholder="Search Cookspire" />
          </div>
        </div>
      </div>

      <div className="cuisine-navigation">Recipes</div>

      <div className="content-name">Cuisines</div>

      <div className="cuisine-list">
        <div className="cuisine-type" onClick={()=>{navigate(`/explore/${TYPE.AMERICAN}/recipes`)}}>
          <img alt="american" src="/Meals/america.svg" title="American" />

          <div className="cuisine-name">American</div>
        </div>

        <div className="cuisine-type" onClick={()=>{navigate(`/explore/${TYPE.ASIAN}/recipes`)}}>
          <img alt="asian" src="/Meals/asia.svg" title="asian" />
          <div className="cuisine-name">Asian</div>
        </div>

        <div className="cuisine-type" onClick={()=>{navigate(`/explore/${TYPE.CHINESE}/recipes`)}}>
          <img alt="chinese" src="/Meals/china.svg" />
          <div className="cuisine-name">Chinese</div>
        </div>

        <div className="cuisine-type" onClick={()=>{navigate(`/explore/${TYPE.CONTINENTAL}/recipes`)}}>
          <img alt="continental" src="/Meals/continental.svg" />
          <div className="cuisine-name">Continental</div>
        </div>

        <div className="cuisine-type" onClick={()=>{navigate(`/explore/${TYPE.INDIAN}/recipes`)}}>
          <img alt="indian" src="/Meals/india.svg" />
          <div className="cuisine-name">Indian</div>
        </div>

        <div className="cuisine-type" onClick={()=>{navigate(`/explore/${TYPE.JAPANESE}/recipes`)}}>
          <img alt="japanese" src="/Meals/japan.svg" />
          <div className="cuisine-name">Japanese</div>
        </div>

        <div className="cuisine-type" onClick={()=>{navigate(`/explore/${TYPE.FRENCH}/recipes`)}}>
          <img alt="french" src="/Meals/french.svg" />
          <div className="cuisine-name">French</div>
        </div>

        <div className="cuisine-type" onClick={()=>{navigate(`/explore/${TYPE.ITALIAN}/recipes`)}}>
          <img alt="italian" src="/Meals/italy.svg" />
          <div className="cuisine-name">Italian</div>
        </div>

        <div className="cuisine-type" onClick={()=>{navigate(`/explore/${TYPE.MEXICAN}/recipes`)}}>
          <img alt="mexican" src="/Meals/mexico.svg" />
          <div className="cuisine-name"> Mexican</div>
        </div>

        <div className="cuisine-type" onClick={()=>{navigate(`/explore/${TYPE.SPANISH}/recipes`)}}>
          <img alt="spanish" src="/Meals/spain.svg" />
          <div className="cuisine-name">Spanish</div>
        </div>
      </div>

      <div className="content-name">Meals</div>

      <div className="cuisine-list">
        <div className="cuisine-type" onClick={()=>{navigate(`/explore/${TYPE.BREAKFAST}/recipes`)}}>
          <img alt="breakfast" src="/Meals/breakfast.svg" />
          <div className="cuisine-name">Breakfast</div>
        </div>

        <div className="cuisine-type" onClick={()=>{navigate(`/explore/${TYPE.BRUNCH}/recipes`)}}>
          <img alt="brunch" src="/Meals/brunch.svg" />
          <div className="cuisine-name">Brunch</div>
        </div>

        <div className="cuisine-type" onClick={()=>{navigate(`/explore/${TYPE.LUNCH}/recipes`)}}>
          <img alt="lunch" src="/Meals/lunch.svg" />
          <div className="cuisine-name">Lunch</div>
        </div>

        <div className="cuisine-type" onClick={()=>{navigate(`/explore/${TYPE.SNACKS}/recipes`)}}>
          <img alt="snacks" src="/Meals/snacks.svg" />
          <div className="cuisine-name">Snacks</div>
        </div>

        <div className="cuisine-type" onClick={()=>{navigate(`/explore/${TYPE.DINNER}/recipes`)}}>
          <img alt="dinner" src="/Meals/dinner.svg" />
          <div className="cuisine-name">Dinner</div>
        </div>

        <div className="cuisine-type" onClick={()=>{navigate(`/explore/${TYPE.LATENIGHT}/recipes`)}}>
          <img alt="latenight" src="/Meals/latenight.svg" />
          <div className="cuisine-name">Late Night</div>
        </div>
      </div>
    </div>
  );
}
