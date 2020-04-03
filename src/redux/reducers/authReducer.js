const initialstate = { user: undefined };

function authReducer(state = initialstate, action) {
  const { payload, type } = action;
  switch (type) {
    case "SET_USER":
      return { user: payload };
    case "UNSET_USER":
      return initialstate;
    default:
      return state;
  }
}

export default authReducer;
