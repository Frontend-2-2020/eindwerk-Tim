const initialstate = {};

function postsReducer(state = initialstate, action) {
  const { payload, type } = action;
  let newState = {};
  let newPosts = [];
  // console.log(payload);
  switch (type) {
    case "SET_POSTS":
      return payload;
    case "ADD_POST":
      newState = { ...state };
      newState.data = [payload, ...state.data];
      return newState;
    case "EDIT_POST":
      newState = { ...state };
      newState.data = newState.data.map((post) =>
        post.id === payload.id ? payload : post
      );
      // newState.data = [payload, ...state.data];
      return newState;
    case "DELETE_POST":
      newPosts = state.data.filter((object) => object.id !== payload);
      newState = { ...state };
      newState.data = newPosts;
      return newState;
    default:
      return state;
  }
}

export default postsReducer;
