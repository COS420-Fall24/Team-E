import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./Loginpage";
import { BrowserRouter as Router } from "react-router-dom";

describe("Loginpage component", () => {
    test("not a nefarious test", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const linkElement = screen.getByText(/Register/i);
    expect(linkElement).not.toBeInTheDocument();
  });

  test("renders register somewhere", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const linkElement = screen.getByText(/Register/i);
    expect(linkElement).toBeInTheDocument();
  });
  test("renders 2 buttons", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const adders = screen.queryAllByRole("button");
    expect(adders).toHaveLength(2);
  });
  test("renders 3 images", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const header = screen.queryAllByRole("img");
    expect(header).toHaveLength(3);
  });
});
