import { API, TOKEN } from "../../API";
import Axios from "axios";

export const getPosts = (selectedPage) => async (dispatch) => {
  const res = await API.get(`api/posts?page=${selectedPage}`);
  dispatch({ type: "SET_POSTS", payload: res.data });
};

export const newPost = (values) => async (dispatch) => {
  // console.log(values);
  const res = await API.post(`api/posts`, values);
  // const res = await Axios.post(`https://eindwerk.jnnck.be/api/posts`, values, {
  //   headers: {
  //     Authorization: `Bearer ${TOKEN}`,
  //   },
  // });
  dispatch({ type: "ADD_POST", payload: res.data });
};
