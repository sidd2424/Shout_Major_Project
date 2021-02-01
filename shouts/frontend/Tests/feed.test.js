import React from "react";
import { getByTestId, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Feed from "../src/components/Feed/Feed";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

const mockStore = configureMockStore();
const store = mockStore({});

describe("Feed Component", () => {
  it("Should display Feed Component", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Feed />
        </BrowserRouter>
      </Provider>
    );
  });
});
