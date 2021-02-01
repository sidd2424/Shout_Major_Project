import axios from "axios";
import Cookies from "js-cookie";

const csrftoken = Cookies.get("csrftoken");
// ===============================GetPosts================================
export const getPosts = (props) => {
  const authToken = props.user.token;
  fetch("/api/posts/", {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  })
    .then((resp) => resp.json())
    .then((data) =>
      props.dispatch({
        type: "setShouts",
        payload: data,
      })
    )
    .catch((error) => console.log("error", error));
};
// ===============================CreatePosts================================
export const createPost = (props, uploadData) => {
  const authToken = props.user.token;
  axios({
    method: "post",
    url: "/api/posts/",
    data: uploadData,
    headers: {
      "X-CSRFToken": csrftoken,
      Authorization: `Token ${authToken}`,
    },
  })
    .then((res) =>
      props.dispatch({
        type: "createShouts",
        payload: res,
      })
    )
    .catch((error) => console.log("error", error));
};
// ===============================UpdatePosts================================
export const updatePost = (props, values) => {
  const authToken = props.user.token;

  axios({
    method: "patch",
    url: `/api/shouts/${props.postId}/`,
    data: values,
    headers: {
      "X-CSRFToken": csrftoken,
      Authorization: `Token ${authToken}`,
    },
  })
    .then((res) => getPosts(props))
    .catch((error) => console.log(error));
};
// ===============================DeletePosts================================
export const deletePost = (props) => {
  const authToken = props.user.token;
  axios({
    method: "delete",
    url: `/api/shouts/${props.postId}/`,

    headers: {
      "X-CSRFToken": csrftoken,
      Authorization: `Token ${authToken}`,
    },
  })
    .then((res) => getPosts(props))
    .catch((error) => console.log(error));
};
// ===============================DeleteMyPosts================================
export const deleteMyPost = (props) => {
  const authToken = props.user.token;

  axios({
    method: "delete",
    url: `/api/shouts/${props.postId}/`,

    headers: {
      "X-CSRFToken": csrftoken,
      Authorization: `Token ${authToken}`,
    },
  })
    .then((res) => getMyPost(props, props.user.user_id))
    .catch((error) => console.log(error));
};

// ===============================UpdateMyPosts================================
export const updateMyPost = (props, values) => {
  const authToken = props.user.token;

  axios({
    method: "patch",
    url: `/api/shouts/${props.postId}/`,
    data: values,
    headers: {
      "X-CSRFToken": csrftoken,
      Authorization: `Token ${authToken}`,
    },
  })
    .then((res) => getMyPost(props, props.user.user_id))
    .catch((error) => console.log(error));
};
// ===============================GetMyPost================================
export const getMyPost = (props, user_id) => {
  const authToken = props.user.token;
  fetch("/api/mypostlist/" + user_id + "/", {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  })
    .then((resp) => resp.json())
    .then((data) =>
      // console.log(data)
      props.dispatch({
        type: "setMyShouts",
        payload: data,
      })
    )
    .catch((error) => console.log("error", error));
};
