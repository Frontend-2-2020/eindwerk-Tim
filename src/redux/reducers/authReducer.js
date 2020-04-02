const initialstate = {};

function authReducer(state = initialstate, action) {
  const { payload, type } = action;
  switch (type) {
    case "SET_USER":
      return payload;
    default:
      return state;
  }
}

export default authReducer;
