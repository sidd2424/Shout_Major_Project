import React from "react";
import { getByTestId, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Navbar from "../src/components/Header/Navbar";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import Shoutyy from "../src/components/Feed/Shoutyy";
const mockStore = configureMockStore();
const store = mockStore({});
const props = {
  user: {
    bio:
      'fdsfg sdgs shdgfh yhrdgj sbfgnjythjer trtrtg feh6tyer hrtghwg y e rgt terhetrye5y erth wer tyr6yu e45y',
    date_joined: '24/12/2020  10:04',
    email: 'sh@gmail.com',
    is_active: true,
    is_staff: false,
    is_superuser: false,
    last_login: '06/01/2021  06:21',
    password: 'shubham',
    user_id: '627aa100-5f7b-4106-96df-dbc4594344d5',
    user_image: 'http://127.0.0.1:8000/media/profile/StockSnap_TNGRS6JOH8.jpg',
    username: 'shubham',
  },
  like: {
    id: '1435aeb9-899a-4517-a8b7-554ca29b5322',
    shout_id: '67cbbe07-fa6c-4c93-b4f4-61621151acb5',
    user_id: '68db1e3b-a6a0-498c-a81b-ea87f1d20776',
  },
  profiles: {
    bio:
      'fdsfg sdgs shdgfh yhrdgj sbfgnjythjer trtrtg feh6tyer hrtghwg y e rgt terhetrye5y erth wer tyr6yu e45y',
    date_joined: '24/12/2020  10:04',
    email: 'sh@gmail.com',
    is_active: true,
    is_staff: false,
    is_superuser: false,
    last_login: '06/01/2021  06:21',
    password: 'shubham',
    user_id: '627aa100-5f7b-4106-96df-dbc4594344d5',
    user_image: 'http://127.0.0.1:8000/media/profile/StockSnap_TNGRS6JOH8.jpg',
    username: 'shubham',
  },

  reports: {
    id: '1b9047a3-8f32-46b8-92f5-7031e1c9fd09',
    report_type: 'Other types of Reports',
    shout_id: '5d6f3227-dfa7-4b62-8bd4-b30ab611e7ad',
    user_id: '627aa100-5f7b-4106-96df-dbc4594344d5',
  },
};

describe("Shout Component", () => {
  it("Should display Shout Component", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Shoutyy props={props} />
        </BrowserRouter>
      </Provider>
    );
  });
});
