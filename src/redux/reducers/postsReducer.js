const initialstate = {};

function postsReducer(state = initialstate, action) {
  const { payload, type } = action;
  let newState = {};
  let newPosts = [];
  let selectedPost = {};
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

    case "LIKE_POST":
      console.log(payload);
      selectedPost = payload;
      newState = { ...state };
      newState.data = state.data.map((post) => {
        if (post.id === selectedPost.id) {
          post.likes_count += 1;
          console.log(post.likes_count);
        }
        return post;
      });
      return newState;
    case "UNLIKE_POST":
      // console.log(this.state.user);
      console.log(payload);
      newState = { ...state };
      selectedPost = payload;
      newState.data = state.data.map((post) => {
        if (post.id === selectedPost.id) {
          post.likes_count -= 1;
          console.log(post.likes_count);
        }
        return post;
      });
      console.log(newState);
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
