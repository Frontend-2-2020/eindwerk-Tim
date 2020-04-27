import { API, TOKEN } from "../../API";
import Axios from "axios";

export const getPosts = (selectedPage) => async (dispatch) => {
  const res = await API.get(`api/posts?page=${selectedPage}`);
  dispatch({ type: "SET_POSTS", payload: res.data });
};

export const newPost = (values, user) => (dispatch) => {
  // console.log(values);
  API.post(`api/posts`, values).then((res) => {
    res.data.user = user;
    dispatch({ type: "ADD_POST", payload: res.data });
  });
  // const res = await Axios.post(`https://eindwerk.jnnck.be/api/posts`, values, {
  //   headers: {
  //     Authorization: `Bearer ${TOKEN}`,
  //   },
  // });
};

export const editPost = (values, user, selectedPost) => (dispatch) => {
  console.log(selectedPost);
  API.put(`api/posts/${selectedPost.id}`, values).then((res) => {
    res.data.user = user;
    dispatch({ type: "EDIT_POST", payload: res.data });
  });
  // const res = await Axios.post(`https://eindwerk.jnnck.be/api/posts`, values, {
  //   headers: {
  //     Authorization: `Bearer ${TOKEN}`,
  //   },
  // });
};

export const deletePost = (postId) => (dispatch) => {
  // console.log("postid = " + postId);
  API.delete(`api/posts/${postId}`).then((res) => {
    dispatch({ type: "DELETE_POST", payload: postId });
  });
};
