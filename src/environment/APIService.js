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
};

export const NotificationType = {
  WARNING: "warning",
  ERROR: "error",
  SUCCESS: "success",
  INFO: "info",
};
