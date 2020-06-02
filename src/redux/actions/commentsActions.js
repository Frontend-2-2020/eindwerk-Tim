import { API } from "../../API";

// export const getComments = (selectedPage) => async (dispatch) => {
//   const res = await API.get(`api/comments?page=${selectedPage}`);
//   dispatch({ type: "SET_COMMENTS", payload: res.data });
// };

export const getComments = (handleComments) => {
  API.get("api/comments").then((res) => handleComments(res.data));
};

export const newComment = (values, user, postId, handleResult) => (
  dispatch
) => {
  API.post(`api/comments`, {
    body: values.body,
    blog_post_id: postId,
  }).then((res) => {
    res.data.user = user;
    handleResult(res.data);
    dispatch({ type: "ADD_COMMENT", payload: res.data });
  });
};

export const editComment = (values, user, selectedComment, handleResult) => (
  dispatch
) => {
  API.put(`api/comments/${selectedComment.id}`, {
    body: values.body,
  }).then((res) => {
    res.data.user = user;
    handleResult(res.data);
  });
};

export const deleteComment = (e, comment) => (dispatch) => {
  e.preventDefault();
  API.delete(`api/comments/${comment.id}`).then((res) => {
    dispatch({ type: "DELETE_COMMENT", payload: comment });
  });
};
