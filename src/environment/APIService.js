export const URL = {
  API_URL:
    process.env.REACT_APP_ENV === "PROD" ? "/api" : "http://localhost:8091",
};

export const APIResponse = {
  BAD_REQUEST: "Error in API Request",
  UNAUTHORIZED: "API Access Denied",
};

export const JSON_HEADERS = {
  "Content-Type": "application/json",
};

export const PATH = {
  CREATE_USER: "/persist/user",
  VERIFY_USER: "/verify/user",
  FETCH_USER: "/fetch/user?email=",

  PERSIST_POST: "/persist/post",
  FETCH_FOLLOWERS_POST: "/fetchAll/post/user/follower?userId=",
  FETCH_USERS_POST: "/fetchAll/post/user?userId=",
  FETCH_TRENDING_POST: "/fetchAll/trending/post?userId=",
};

export const NotificationType = {
  WARNING: "warning",
  ERROR: "error",
  SUCCESS: "success",
  INFO: "info",
};
