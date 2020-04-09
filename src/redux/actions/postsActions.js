import { API } from "../../API";

export const getPosts = () => async (dispatch) => {
  const res = await API.get("api/posts");
  dispatch({ type: "SET_POSTS", payload: res.data });
};

export const newPost = (values) => async (dispatch) => {
  // console.log(values);
  const res = await API.post("api/posts", values);

  dispatch({ type: "ADD_POST", payload: res.data });
};
