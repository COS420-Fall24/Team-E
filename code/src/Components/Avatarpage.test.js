import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./Avatarpage";
import { BrowserRouter as Router } from "react-router-dom";

describe("Avatar page components", () => {
  test("renders customize avatar", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const linkElement = screen.getByText(/Customize Avatar/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders the three navigational buttons", () => {
    render(
      <Router>
        <App />
      </Router>
    );

    const homeButton = screen.getByText(/Home/i);
    const tasksButton = screen.getByText(/Tasks/i);
    const signOutButton = screen.getByText(/Sign Out/i);

    expect(homeButton).toBeInTheDocument();
    expect(tasksButton).toBeInTheDocument();
    expect(signOutButton).toBeInTheDocument();
  });

  test("renders 6 dropdowns", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const dropdownButtons = [
      "Background",
      "Skin Tone",
      "Eye Color",
      "Hair",
      "Hats",
      "Outfits",
    ].map((text) => screen.getByText(text));
    expect(dropdownButtons.length).toBe(6);
  });

  //   test("displays the menu when the dropdown button is clicked", () => {
  //     render(
  //       <Router>
  //         <App />
  //       </Router>
  //     );

  //     // Find the dropdown button
  //     const dropdownButton = screen.getByText(/None/i); // Adjust text as necessary

  //     // Initially, the menu should not be visible
  //     const dropdownMenu = screen.queryByText(/hearts/i); // Adjust text as necessary
  //     expect(dropdownMenu).not.toBeInTheDocument();

  //     // Simulate clicking the dropdown button
  //     fireEvent.click(dropdownButton);

  //     // Now, the menu should be visible
  //     const visibleMenu = screen.getByText(/hearts/i); // Adjust text as necessary
  //     expect(visibleMenu).toBeInTheDocument();
  //   });

  test("navigation buttons trigger the appropriate navigation functions", () => {
    const navigateMock = jest.fn();
    render(
      <Router>
        <App />
      </Router>
    );

    // Click Home button
    fireEvent.click(screen.getByText("Home"));
    expect(navigateMock).toHaveBeenCalledWith("/home");

    // Click Tasks button
    fireEvent.click(screen.getByText("Tasks"));
    expect(navigateMock).toHaveBeenCalledWith("/task");

    // Click Sign Out button
    fireEvent.click(screen.getByText("Sign Out"));
    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
