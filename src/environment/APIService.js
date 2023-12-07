export const BACKEND = {
  API_URL:
    process.env.REACT_APP_ENV === "PROD" ? "/api" : "http://localhost:8091",
};

export const APIResponse = {
  BAD_REQUEST: "Error in API Request",
  UNAUTHORIZED: "API Access Denied",
  BAD_RESPONSE: "Error during API call ",
};

export const IMAGE_TYPE = {
  JPEG: "image/jpeg",
  PNG: "image/png",
};

export const IMAGE_SRC = {
  JPEG: "data:image/jpeg;base64,",
  PNG: "data:image/png;base64,",
};

export const TRENDING = {
  ID: 0,
};

export const JSON_HEADERS = {
  "Content-Type": "application/json",
};

export const MULTI_PART_HEADERS = {
  "Content-Type": "multipart/form-data",
};

export const PATH = {
  CREATE_USER: "/persist/user",
  VERIFY_USER: "/verify/user",
  FETCH_USER: "/fetch/user?email=",
  SPOTLIGHT_USER: "/fetch/profile/spotlight",
  SUGGESTED_USER: "/fetch/suggested/user?email=",
  FOLLOW_USER: "/follow/user",
  FETCH_USER_FOLLOWER_INFO: "/fetchAll/followersInfo?userId=",

  FETCH_TRENDING_USERS: "/fetch/trending/profile",
  
  PERSIST_POST: "/persist/post",
  FETCH_FOLLOWERS_POST: "/fetchAll/post/user/follower?userId=",
  FETCH_USERS_POST: "/fetchAll/post?currentUser=",
  FETCH_TRENDING_POST: "/fetchAll/trending/post?userId=",

  FETCH_GENERAL_ANALYSIS: "/fetch/general/userAnalysis?userId=",

  SEARCH_COOKSPIRE: "/search/cookspire",
  SEARCH_RECIPE: "/search/recipe",
  SEARCH_USERS: "/search/people",

  FETCH_RECIPE_CUISINE: "/fetch/recipe/cuisine?name=",
  FETCH_RECIPE_COURSE: "/fetch/recipe/course?name=",

  FETCH_COMPLETE_RECIPE: "/fetch/complete/recipe?recipeId=",

  PERSIST_INTERACTION: "/persist/interaction",
};

export const NotificationType = {
  WARNING: "warning",
  ERROR: "error",
  SUCCESS: "success",
  INFO: "info",
};
