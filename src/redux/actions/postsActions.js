import { API } from "../../API";

export const getPosts = () => async dispatch => {
  const res = await API.get("api/posts");
  dispatch({ type: "SET_POSTS", payload: res.data });
};
