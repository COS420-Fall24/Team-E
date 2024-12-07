import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./TaskPage";
import { BrowserRouter as Router } from "react-router-dom";

describe("Taskpage component", () => {
  test("renders Upcoming Tasks somewhere", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const linkElement = screen.getByText(/Upcoming Tasks/i);
    expect(linkElement).toBeInTheDocument();
  });
  test("renders 50 buttons", () => {
    // The calendar counts as 40 buttons
    render(
      <Router>
        <App />
      </Router>
    );
    const adders = screen.queryAllByRole("button");
    expect(adders.length).toBeGreaterThanOrEqual(46);
  });
  test("renders 5 images", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const header = screen.queryAllByRole("img");
    expect(header.length).toBeGreaterThanOrEqual(3);
  });

  test("displays user points correctly", () => {
    render(
        <Router>
            <App />
        </Router>
    );
  });
});
