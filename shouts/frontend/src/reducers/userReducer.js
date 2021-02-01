const initialState = {};

function reducer(state = initialState, action) {
  if (action.type === "AddUser") {
    state = action.payload;
  }

  return state;
}

export default reducer;
