import { API } from "../../API";

// export const getComments = (selectedPage) => async (dispatch) => {
//   const res = await API.get(`api/comments?page=${selectedPage}`);
//   dispatch({ type: "SET_COMMENTS", payload: res.data });
// };

export const newComment = (values, user) => (dispatch) => {
  // console.log(values);
  API.post(`api/comments`, values).then((res) => {
    res.data.user = user;
    dispatch({ type: "ADD_COMMENT", payload: res.data });
  });
  // const res = await Axios.post(`https://eindwerk.jnnck.be/api/comments`, values, {
  //   headers: {
  //     Authorization: `Bearer ${TOKEN}`,
  //   },
  // });
};

export const editComment = (values, user, selectedComment) => (dispatch) => {
  console.log(selectedComment);
  API.put(`api/comments/${selectedComment.id}`, values).then((res) => {
    res.data.user = user;
    dispatch({ type: "EDIT_COMMENT", payload: res.data });
  });
  // const res = await Axios.post(`https://eindwerk.jnnck.be/api/comments`, values, {
  //   headers: {
  //     Authorization: `Bearer ${TOKEN}`,
  //   },
  // });
};

export const deleteComment = (e, commentId) => (dispatch) => {
  e.preventDefault();
  // console.log("commentid = " + commentId);
  API.delete(`api/comments/${commentId}`).then((res) => {
    dispatch({ type: "DELETE_COMMENT", payload: commentId });
  });
};
