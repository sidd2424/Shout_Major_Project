const initialState = {
  token: sessionStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
};

function reducer(state = initialState, action) {
  if (action.type === "AddToken") {
    sessionStorage.setItem("token", action.payload.token);
    sessionStorage.setItem("user", action.payload.username);
    state = action.payload;
    return {
      ...state,
      token: sessionStorage.getItem("token"),
      isAuthenticated: true,
      user: action.payload.user,
    };
  }

  if (action.type === "UpdateUser") {
    return {
      ...state,
      bio: action.payload.bio,
    };
  }

  return state;
}

export default reducer;
