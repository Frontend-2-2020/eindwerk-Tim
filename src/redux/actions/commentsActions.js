import { API } from "../../API";

// export const getComments = (selectedPage) => async (dispatch) => {
//   const res = await API.get(`api/comments?page=${selectedPage}`);
//   dispatch({ type: "SET_COMMENTS", payload: res.data });
// };

export const newComment = (values, user, postId, handleResult) => (
  dispatch
) => {
  // console.log(values);
  API.post(`api/comments`, {
    body: values.body,
    blog_post_id: postId,
  }).then((res) => {
    res.data.user = user;
    // return res.data;
    handleResult(res.data);
    // dispatch({ type: "ADD_COMMENT", payload: res.data });
  });
};

export const editComment = (
  values,
  user,
  selectedComment,
  postId,
  handleResult
) => (dispatch) => {
  console.log(selectedComment);
  API.put(`api/comments/${selectedComment.id}`, {
    values,
    blog_post_id: postId,
  }).then((res) => {
    res.data.user = user;
    handleResult(res.data);
    // dispatch({ type: "EDIT_COMMENT", payload: res.data });
  });
};

export const deleteComment = (e, commentId) => (dispatch) => {
  e.preventDefault();
  // console.log("commentid = " + commentId);
  API.delete(`api/comments/${commentId}`).then((res) => {
    dispatch({ type: "DELETE_COMMENT", payload: commentId });
  });
};
