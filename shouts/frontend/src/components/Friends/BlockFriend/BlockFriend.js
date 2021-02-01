import React from "react";
import { connect } from "react-redux";
import {Container} from '@material-ui/core'

function BlockFriend() {
//   useEffect(() => {
//     friendlistreceived();

//     return () =>
//       console.log("***************FriendRequestsReceivedList Unmounted");
//   }, []);
//   const pk = props.user.id;
//   const friendlistreceived = () => {
//     fetch(`/api/requestreceived/${pk}`)
//       .then((res) => res.json())
//       .then((data) =>
//         props.dispatch({
//           type: "DisplayRequestsReceived",
//           payload: data,
//         })
//       );
//   };

//   const acceptRequest = (data) => {
//     axios
//       .patch(`/api/friendlist/${data.id}`, data)
//       .then((res) => friendlistreceived())
//       .catch((error) => console.log(error));
//   };

//   const rejectRequest = (data) => {
//     axios
//       .delete(`/api/friendlist/${data.id}`, data)
//       .then((res) => friendlistreceived())
//       .catch((error) => console.log(error));
//   };

  console.log("***********", props.blockFriendList);

  return (
    <div>
      <Container>
        {props.blockFriendList.map((data, item) => {
          return (
            <div key={item}>
              {/* Chnage the name=shubham dynamically using state */}
              {data.sender === props.user.username ? null : (
                <p>
                  <span>{data.sender}</span>
                  <button type="button" onClick={() => acceptRequest(data)}>
                    Accept
                  </button>
                  <button type="button" onClick={() => rejectRequest(data)}>
                    Reject
                  </button>
                </p>
              )}
            </div>
          );
        })}
      </Container>
    </div>
  );
}

const mapStoreToProps = (state) => {
  return {
    blockFriendList: state.blockFriendList.blockFriendList,
    user: state.friendList.user,
  };
};
export default connect(mapStoreToProps)(BlockFriend);
