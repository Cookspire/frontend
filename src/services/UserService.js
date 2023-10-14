import { JSON_HEADERS, PATH, URL } from "../environment/APIService";

export const userService = {
  verify: (request) => {
    fetch(URL.API_URL + PATH.VERIFY_USER, {
      headers: JSON_HEADERS,
      body: {
        email: request.email,
        password: request.password,
      },
    })
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        return err;
      });
  },
};
