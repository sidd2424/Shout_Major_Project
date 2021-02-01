export const getComments = (props) => {
  const authToken = props.user.token;
  fetch("http://localhost:8000/api/shoutcomment/", {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) =>
      props.dispatch({
        type: "getComment",
        payload: data,
      })
    );
};
