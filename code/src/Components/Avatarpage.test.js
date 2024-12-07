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
          "Background", "Skin Tone", "Eye Color", "Hair", "Hats", "Outfits"
        ].map(text => screen.getByText(text));
        expect(dropdownButtons.length).toBe(6);
      });


      test("displays the menu when the dropdown button is clicked", () => {
        render(
          <Router>
            <App />
          </Router>
        );

        const dropdownButton = screen.getByTestId('dropdown-button-0');

        const dropdownMenu = screen.queryByText('Hearts');
        expect(dropdownMenu).not.toBeInTheDocument();

        fireEvent.click(dropdownButton);

        const visibleMenu = screen.getByText('Hearts');
        expect(visibleMenu).toBeInTheDocument();
      });


      test("multiple selections update the state and display correct images", () => {
        render(
          <Router>
            <App />
          </Router>
        );

        const pointsElement = screen.getByText(/Points:/i);
        expect(pointsElement).toBeInTheDocument();

        fireEvent.click(screen.getByTestId('dropdown-button-0'));

        fireEvent.click(screen.getByText('Hearts'));

        fireEvent.click(screen.getByTestId('dropdown-button-1'));

        fireEvent.click(screen.getByText('Fair'));

        const heartsImage = screen.getAllByAltText('avatar-option')[0];
        expect(heartsImage).toBeInTheDocument();
        expect(heartsImage.src).toContain('bghearts.png');

        const skinImage = screen.getAllByAltText('avatar-option')[1];
        expect(skinImage).toBeInTheDocument();
        expect(skinImage.src).toContain('skin1.png');
    });

    test("displays user points correctly", () => {
      render(
          <Router>
              <App />
          </Router>
      );
    });


});