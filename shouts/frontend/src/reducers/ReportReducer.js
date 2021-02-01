const initialState = {
  report: [],
};

function ReportReducer(state = initialState, action) {
  if (action.type === "getreports") {
    return { ...state, report: action.payload };
  }

  return state;
}

export default ReportReducer;
