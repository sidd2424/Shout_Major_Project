const initialState = {
  search: "",
  searchType: "",
};

function SearchReducer(state = initialState, action) {
  if (action.type === "SearchReducer") {
    return { ...state, search: action.payload };
  }

  if (action.type === "SearchType") {
    return { ...state, searchType: action.payload };
  }
  return state;
}

export default SearchReducer;
