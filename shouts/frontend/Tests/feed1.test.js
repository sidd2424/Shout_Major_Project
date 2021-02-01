import React from "react";
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from "./test-utils";
import Feed from "../src/components/Feed/Feed";

it("Renders the connected Feed with initialState", () => {
  render(<Feed />, { initialState: { user: "Redux User" } });

  
})