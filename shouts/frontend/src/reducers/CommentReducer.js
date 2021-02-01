// const initialState = {};

// function reducer(state = initialState, action) {
//   if (action.type === "AddComment") {
//     state = action.payload;
//   }

//   return state;
// }

// export default reducer;

import { FETCH_COMMENTS } from "../actions/action_types";
const initialState = {
  comments: [],
};
const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "getComment":
   
      return { ...state, comments: action.payload };

    default:
      return state;
  }
};
export default commentReducer;
