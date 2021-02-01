const initialState = {
  like : []
};

function reducer(state = initialState, action) {
  if (action.type === "AddLike") {
    
    return {...state, like : action.payload};
  }
  if (action.type === "setLike") {
    
    state = action.payload;
    return state
  }
  if (action.type === "delete_like") {
    
    return state;
   
  }

  return state;
}

export default reducer;