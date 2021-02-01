export const getReports = (props) => {
  const authToken = props.user.token;
  fetch("http://localhost:8000/api/shoutreport/", {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) =>
      props.dispatch({
        type: "getreports",
        payload: data,
      })
    );
};
