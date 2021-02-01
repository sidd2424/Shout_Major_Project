import React from "react";
import { render } from "@testing-library/react";

import App from "../src/components/App";

describe("App Component", () => {
  it("Should display App Component", () => {
    render(<App />);
  });
});
