import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";

import userReducer from "./userReducer";
import FriendListReducer from "../components/Friends/FriendList/FriendListReducer";
import ReceiverReducer from "../components/Friends/Received/ReceiverReducer";
import SenderReducer from "../components/Friends/Sent/SenderReducer";
import BlockFriendReducer from "../components/Friends/BlockFriend/BlockFriendReducer";
import SearchReducer from "../components/Friends/Dashboard/SearchReducer";
import ShoutsReducer from "./ShoutsReducer";

import LikeReducer from "./LikeReducer";
import CommentReducer from "./CommentReducer";
import ReportReducer from "./ReportReducer";

import PostSearchReducer from "./PostSearchReducer";


const rootReducer = combineReducers({
  user: userReducer,
  login: loginReducer,
  register: registerReducer,
  requestReceived: ReceiverReducer,
  requestSent: SenderReducer,
  friendList: FriendListReducer,
  blockFriendList: BlockFriendReducer,
  postSearch: PostSearchReducer,
  search: SearchReducer,
  shouts: ShoutsReducer,
  like: LikeReducer,
  Comment: CommentReducer,
  report: ReportReducer,
});

export default rootReducer;
