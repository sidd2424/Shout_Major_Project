const initialState = {
  requestSent: [],
};

function SenderReducer(state = initialState, action) {
  if (action.type === "DisplayRequestsSent") {
    return { ...state, requestSent: action.payload };
  }
  return state;
}

export default SenderReducer;
