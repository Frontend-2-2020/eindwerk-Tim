import { API } from "../../API";

// export const getPosts = (selectedPage) => async (dispatch) => {
//   const res = await API.get(`api/posts?page=${selectedPage}`);
//   dispatch({ type: "SET_POSTS", payload: res.data });
// };

export const getPosts = (selectedPage, getAllPosts) => (dispatch) => {
  API.get(`api/posts?page=${selectedPage}`).then((res) => {
    dispatch({ type: "SET_POSTS", payload: res.data });
    // console.log(res.data.last_page);
    getAllPosts(res.data.last_page);
  });
};

export const getAllPosts = (pageCount) => (dispatch) => {
  let allPosts = [];
  for (let i = 0; i < pageCount; i++) {
    API.get(`api/posts?page=${i}`).then((res) => {
      allPosts = [...allPosts, ...res.data.data];
      // this.setState({ allPosts });
      dispatch({ type: "SET_ALL_POSTS", payload: allPosts });
    });
    // dispatch({ type: "SET_ALL_POSTS", payload: allPosts });
  }
};

// export const getPosts = (selectedPage) => (dispatch) => {
//   API.get(`api/posts?page=${selectedPage}`).then((res) => {
//     dispatch({ type: "SET_POSTS", payload: res.data });
//   });
// };

export const newPost = (values, user) => (dispatch) => {
  API.post(`api/posts`, values).then((res) => {
    res.data.user = user;
    dispatch({ type: "ADD_POST", payload: res.data });
  });
};

export const editPost = (values, user, selectedPost) => (dispatch) => {
  API.put(`api/posts/${selectedPost.id}`, values).then((res) => {
    res.data.user = user;
    dispatch({ type: "EDIT_POST", payload: res.data });
  });
};

export const deletePost = (e, postId) => (dispatch) => {
  e.preventDefault();
  // console.log("postid = " + postId);
  API.delete(`api/posts/${postId}`).then((res) => {
    dispatch({ type: "DELETE_POST", payload: postId });
  });
};

export const like = (post) => (dispatch) => {
  // console.log("liked " + post.id);
  API.post(`/api/posts/${post.id}/like`).then((res) => {
    dispatch({ type: "LIKE_POST", payload: post });
  });
};

export const unlike = (post) => (dispatch) => {
  // console.log("unliked " + post.id);
  API.post(`/api/posts/${post.id}/unlike`).then((res) => {
    dispatch({ type: "UNLIKE_POST", payload: post });
  });
};
