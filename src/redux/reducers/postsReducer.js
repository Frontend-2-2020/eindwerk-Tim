const initialstate = {};

function postsReducer(state = initialstate, action) {
  const { payload, type } = action;
  switch (type) {
    case "SET_POSTS":
      return payload;
    default:
      return state;
  }
}

export default postsReducer;
