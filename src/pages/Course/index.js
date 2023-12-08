import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import RecipeCard from "../../components/ui/RecipeCard";
import { UpdateNotificationContext } from "../../context/NotificationContext";
import {
  APIResponse,
  NotificationType,
  PATH,
  BACKEND,
  JSON_HEADERS,
} from "../../environment/APIService";
import "./index.css";
import useDebounce from "../../hooks/useDebounce";

export default function Course() {
  const { name } = useParams();

  const navigate = useNavigate();

  const setNotificationData = useContext(UpdateNotificationContext);

  const [globalSearch, setGlobalSearch] = useState("");

  const debouncedSearchValue = useDebounce(globalSearch, 250);

  const [recipeList, setRecipeList] = useState([]);

  const [maxPageNumber, setMaxPageNumber] = useState(0);

  const [currentPageNumber, setCurrentPageNumber] = useState(0);

  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    if (name && name.length === 0) {
      navigate("/explore");
    } else {
      fetchRecipeByCourse(name);
    }
  }, [name, navigate]);

  useEffect(() => {
    handleSearchSubmit(debouncedSearchValue);
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (maxPageNumber > 0 && currentPageNumber >= maxPageNumber) {
      setShowMore(false);
    }
  }, [maxPageNumber, currentPageNumber]);

  async function filterRecipe(
    query,
    dietPlan,
    fromTime,
    toTime,
    cuisine,
    course,
    pageNumber
  ) {
    fetch(BACKEND.API_URL + PATH.FILTER_RECIPE, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({
        query: query,
        dietPlan: dietPlan,
        fromTime: fromTime,
        toTime: toTime,
        cuisine: cuisine,
        course: course,
        currentPageNumber: pageNumber,
      }),
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else {
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
          setRecipeList(responseList);
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

  async function fetchRecipeByCourse(course) {
    fetch(
      BACKEND.API_URL +
        PATH.FETCH_RECIPE_COURSE +
        course +
        "&pageNumber=" +
        currentPageNumber,
      {
        method: "POST",
      }
    )
      .then((response) => {
        if (response.status === 200) return response.json();
        else {
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
          if (data.maxPageNumber === 0) setShowMore(false);
          else setMaxPageNumber(() => data.maxPageNumber);
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

  const dietRef = useRef();
  const timingRef = useRef();

  const loadMoreData = () => {
    if (currentPageNumber <= maxPageNumber) {
      fetchRecipeByCourse(name);
    }
  };

  const handleSearchSubmit = (value) => {
    const fromTime = timingRef.current.value.split(":")[0];
    const toTime = timingRef.current.value.split(":")[1];

    const reqDiet =
      dietRef.current.value.length > 0 ? dietRef.current.value : null;
    const reqFromTime = fromTime.length > 0 ? fromTime : 0;
    const reqToTime = toTime.length > 0 ? toTime : 100;
    const query = value.length > 0 ? value : "";
    const cusine = null;
    const course = name;
    filterRecipe(query, reqDiet, reqFromTime, reqToTime, cusine, course, 0);
  };

  const handleFilter = () => {
    const fromTime = timingRef.current.value.split(":")[0];
    const toTime = timingRef.current.value.split(":")[1];

    const reqDiet =
      dietRef.current.value.length > 0 ? dietRef.current.value : null;
    const reqFromTime = fromTime.length > 0 ? fromTime : 0;
    const reqToTime = toTime.length > 0 ? toTime : 100;
    const query = "";
    const cusine = null;
    const course = name;

    filterRecipe(query, reqDiet, reqFromTime, reqToTime, cusine, course, 0);
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
              placeholder="Filter within Course"
              maxLength={1000}
              onChange={(e) => {
                setGlobalSearch(e.target.value);
              }}
              value={globalSearch}
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
              <select
                id="diet"
                type="text"
                onChange={handleFilter}
                ref={dietRef}
              >
                <option value="">--Diet Plan--</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non vegeterian">Non Vegeterian</option>
                <option value="eggetarian">Eggetarian</option>
              </select>
            </div>
          </div>

          <div className="filter-data">
            <div className="field">
              <select
                id="timing"
                type="text"
                onChange={handleFilter}
                ref={timingRef}
              >
                <option value=":">--By time--</option>
                <option value="0:10">&lt;10 mins</option>
                <option value="10:20">10-20 mins</option>
                <option value="20:40">20-40 mins</option>
                <option value="40:240">&gt;40min</option>
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
      {showMore && recipeList.length > 0 && (
        <div className="data-loader-action">
          <button onClick={loadMoreData}> Show more</button>
        </div>
      )}

      {recipeList.length === 0 && (
        <div className="new-user">No match found</div>
      )}
    </div>
  );
}
