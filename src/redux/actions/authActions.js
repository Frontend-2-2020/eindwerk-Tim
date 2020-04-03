import { API } from "../../API";

export const getUser = () => async dispatch => {
  await API.get("api/user").then(response => {
    dispatch({ type: "SET_USER", payload: response.data });
  });
};

export const logout = () => dispatch => {
  window.localStorage.removeItem("EINDWERK_LOGIN_OAUTHTOKEN");
  API.defaults.headers.common["Authorization"] = undefined;
  dispatch({ type: "UNSET_USER" });
};
