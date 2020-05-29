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
      selectedPost = payload;
      newState = { ...state };
      newState.data = state.data.map((post) => {
        if (post.id === selectedPost.id) {
          post.likes_count += 1;
        }
        return post;
      });
      return newState;
    case "UNLIKE_POST":
      // console.log(this.state.user);
      newState = { ...state };
      selectedPost = payload;
      newState.data = state.data.map((post) => {
        if (post.id === selectedPost.id) {
          post.likes_count -= 1;
        }
        return post;
      });
      return newState;
    case "DELETE_POST":
      newPosts = state.data.filter((post) => post.id !== payload);
      newState = { ...state };
      newState.data = newPosts;
      return newState;
    case "ADD_COMMENT":
      console.log(payload);
      newState = { ...state };
      newState.data = state.data.map((post) => {
        if (post.id === payload.blog_post_id) {
          post.comments.push(payload);
        }
        return post;
      });
      // let post = state.data.filter((post) => post.id == payload.blog_post_id);
      // post.comments.push(payload);
      return newState;
    default:
      return state;
  }
}

export default postsReducer;
