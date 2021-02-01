const initialState = {
  friendList: [],
  profiles: [],
};

function FriendListReducer(state = initialState, action) {
  if (action.type === "DisplayList") {
    return { ...state, friendList: action.payload };
  }

  if (action.type === "storeProfileinfo") {
    return { ...state, profiles: action.payload };
  }
  return state;
}

export default FriendListReducer;
