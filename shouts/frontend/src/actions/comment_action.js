import { FETCH_COMMENTS } from "../actions/action_types";
import axios from "axios";
import Cookies from "js-cookie";
export function fetchComments(props) {
  const csrftoken = Cookies.get("csrftoken");
  return function (dispatch) {
    axios
      .get(`http://localhost:8000/api/shoutcomment/`)

      .then((res) => {
        const data = res.data;
        console.log(data);
        props.dispatch({ type: FETCH_COMMENTS, payload: data });
      });
  };
}
