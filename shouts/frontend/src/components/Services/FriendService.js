import axios from "axios";

export const friendlistdata = (props) => {
  const authToken = props.user.token;
  const pk = props.user.user_id;
  axios
    .get(`/api/friendlist/${pk}`, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    })
    .then((res) =>
      props.dispatch({
        type: "DisplayList",
        payload: res.data,
      })
    )
    .catch((error) => console.log("errrorrrr==", error));
};

export const friendlistreceived = (props) => {
  const authToken = props.user.token;
  const pk = props.user.user_id;
  fetch(`/api/requestreceived/${pk}`, {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) =>
      props.dispatch({
        type: "DisplayRequestsReceived",
        payload: data,
      })
    )
    .catch((error) => console.log("errrorrrr==", error));
};

export const newfrienddata = (props) => {
  const authToken = props.user.token;
  const pk = props.user.user_id;

  fetch(`/api/requestsent/${pk}`, {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) =>
      props.dispatch({
        type: "DisplayRequestsSent",
        payload: data,
      })
    )
    .catch((error) => console.log("errrorrrr==", error));
};

export const profiledata = (props) => {
  const authToken = props.user.token;
  fetch(`/api/profile/`, {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) =>
      props.dispatch({
        type: "storeProfileinfo",
        payload: data,
      })
    )
    .catch((error) => console.log("errrorrrr==", error));
};
