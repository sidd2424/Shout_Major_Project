import React from "react";
import { getByTestId, render ,screen} from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Navbar from "../src/components/Header/Navbar";
import {BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureMockStore();
const store = mockStore({});

describe("Navbar Component", () => {
  it("Should display Navbar Component", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
    <Navbar />
    </BrowserRouter>
    </Provider>);
  });
  
  
})

it('check if Navbar Elements displays for desktop view', () => {
  const { getByTestId } = render(<Provider store={store}>
    <BrowserRouter>
<Navbar />
</BrowserRouter>
</Provider>);
  const search = getByTestId('search');
  const home=getByTestId('home');
  const profile=getByTestId('profile');
  const friends=getByTestId('friends');
  const logout=getByTestId('logout')
  expect(search).toBeInTheDocument();
  expect(home).toBeInTheDocument();
  expect(profile).toBeInTheDocument();
  expect(friends).toBeInTheDocument();
  expect(logout).toBeInTheDocument();
  
});

it('check if Navbar Elements displays for Mobile view', () => {
  const { getByTestId } = render(<Provider store={store}>
    <BrowserRouter>
<Navbar />
</BrowserRouter>
</Provider>);
  
  const home=getByTestId('homeMob');
  const profile=getByTestId('profileMob');
  const friends=getByTestId('friendsMob');
  const logout=getByTestId('logoutMob');
  const menu=getByTestId('menu')
 
  expect(home).toBeInTheDocument();
  expect(profile).toBeInTheDocument();
  expect(friends).toBeInTheDocument();
  expect(logout).toBeInTheDocument();
  expect(menu).toBeInTheDocument();
  
});
