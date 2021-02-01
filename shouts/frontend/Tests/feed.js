import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Feed from "../src/components/Feed/Feed";
const mockStore = configureMockStore();
const store = mockStore({});
// describe("Feed Component", () => {
//     const props = {
//       profiles:{
//           bio: "No bio.....",
// date_joined: "24/12/2020  10:03",
// email: "abhi@gmail.com",
// is_active: true,
// is_staff: true,
// is_superuser: true,
// last_login: "04/01/2021  06:56",
// password: "pbkdf2_sha256$216000$2qVSHnYc9xFB$Ggf5mrfDmy1ve1ndQffx4UWUQb8x3oOLHGWlooMiCew=",
// user_id: "58560c34-10ed-4ee3-9707-3226045be6e5",
// user_image: "http://127.0.0.1:8000/media/avatar.png",
// username: "admin",
//       }
//     };
//   it("Should display Feed Component", () => {
//     render(
//       <Provider store={store}>
//         <Feed {...props} />
//       </Provider>
//     );
//   });
// });
