import axios from "axios";
import Cookies from "js-cookie";

const csrftoken = Cookies.get("csrftoken");
export const getLikes = (props) => {
    fetch("http://localhost:8000/api/shoutlike/")
      .then((res) => res.json())
      .then((data) =>
        props.dispatch({
          type: "AddLike",
          payload: data,
        })
      );
  };

 export const deleteLike = (id) => {
    axios({
      method: "delete",
      url: `http://localhost:8000/api/shoutlike/${id}/`,
      headers: {
        "X-CSRFToken": csrftoken,
      },
    })
      // .then((res) => getLike(props))
      .then((data) => getLikes(props))
      .catch((error) => console.log(error));
  };