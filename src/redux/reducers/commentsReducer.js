const initialstate = {};

function commentsReducer(state = initialstate, action) {
  const { payload, type } = action;
  let newState = {};
  let newComments = [];
  // console.log(payload);
  // switch (type) {
  //   case "SET_COMMENTS":
  //     return payload;
  //   case "ADD_COMMENT":
  //     newState = { ...state };
  //     newState.data = [payload, ...state.data];
  //     return newState;
  //   case "EDIT_COMMENT":
  //     newState = { ...state };
  //     newState.data = newState.data.map((comment) =>
  //       comment.id === payload.id ? payload : comment
  //     );
  //     // newState.data = [payload, ...state.data];
  //     return newState;
  //   case "DELETE_COMMENT":
  //     newComments = state.data.filter((object) => object.id !== payload);
  //     newState = { ...state };
  //     newState.data = newComments;
  //     return newState;
  //   default:
  //     return state;
  // }
}

export default commentsReducer;
