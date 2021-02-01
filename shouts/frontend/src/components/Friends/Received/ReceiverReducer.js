const initialState = {
  requestReceived: [],
};

function ReceiverReducer(state = initialState, action) {
  if (action.type === "DisplayRequestsReceived") {
    return { ...state, requestReceived: action.payload };
  }

  return state;
}

export default ReceiverReducer;
