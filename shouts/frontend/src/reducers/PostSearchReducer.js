
function PostSearchReducer(state = "", action) {
    if (action.type === "Search Posts") {
      state = action.payload;
    }
  
    return state;
  }
  
  export default PostSearchReducer;
  