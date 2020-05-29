import { API } from "../../API";

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

export const deletePost = (e, postId) => (dispatch) => {
  e.preventDefault();
  // console.log("postid = " + postId);
  API.delete(`api/posts/${postId}`).then((res) => {
    dispatch({ type: "DELETE_POST", payload: postId });
  });
};

export const like = (post) => (dispatch) => {
  console.log("liked " + post.id);
  API.post(`/api/posts/${post.id}/like`).then((res) => {
    dispatch({ type: "LIKE_POST", payload: post });
  });
};

export const unlike = (post) => (dispatch) => {
  console.log("unliked " + post.id);
  API.post(`/api/posts/${post.id}/unlike`).then((res) => {
    dispatch({ type: "UNLIKE_POST", payload: post });
  });
};
