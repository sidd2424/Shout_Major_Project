function ShoutsReducer(state = [], action) {
  if (action.type === "setShouts") {
    // console.log("setShouts", state);
    return action.payload;
  }
  if (action.type === "setMyShouts") {
    // console.log("setMyShouts", state);
    return action.payload;
  }
  
  if (action.type === "createShouts") {
    
    return [action.payload.data, ...state];
  }
  if (action.type === "edit_post") {
    console.log(action.payload);
    return state
  }

  if (action.type === "delete_post") {
    console.log("delete",state);
    return state;
   
  }
  return state;
}
export default ShoutsReducer;
