const initialState = {
    blockFriendList: [],
  };
  
  function BlockFriendReducer(state = initialState, action) {
    if (action.type === "DisplayBlockFriends") {
      return { ...state, blockFriendList: action.payload };
    }
  
    return state;
  }
  
  export default BlockFriendReducer;
  