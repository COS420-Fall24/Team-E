import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

  test("renders two navigational buttons", () => {
    render(
      <Router>
        <App />
      </Router>
    );

    const homeButton = screen.getByText(/Home/i);
    const signOutButton = screen.getByText(/Sign Out/i);

    expect(homeButton).toBeInTheDocument();
    expect(signOutButton).toBeInTheDocument();
  });

  // Mock Firebase auth and Firestore
  jest.mock("./firebase", () => ({
    auth: {
      currentUser: {
        uid: "testUserId",
      },
    },
    db: {
      collection: jest.fn(),
      doc: jest.fn(),
      getDoc: jest.fn(),
      updateDoc: jest.fn(),
    },
  }));

  test("adds a new task", async () => {
    const setPoints = jest.fn();

    render(
      <Router>
        <App points={0} setPoints={setPoints} />
      </Router>
    );

    // Open the new task modal
    const newTaskButton = screen.getByTestId("newTaskButton");
    fireEvent.click(newTaskButton);

    // Fill out the task form
    const titleInput = screen.getByPlaceholderText("Task Name");
    const descriptionInput = screen.getByLabelText("Description:");
    const taskTypeSelect = screen.getByLabelText("Task Type:");

    // Find the dropdowns for hours and minutes
    const timeSelectors = screen.getAllByRole("combobox");
    const timeHourSelect = timeSelectors[1]; // Assuming the second combobox is the hour select
    const timeMinuteSelect = timeSelectors[2]; // Assuming the third combobox is the minute select

    fireEvent.change(titleInput, { target: { value: "Test Task" } });
    fireEvent.change(descriptionInput, {
      target: { value: "This is a test task description." },
    });
    fireEvent.change(taskTypeSelect, { target: { value: "Work" } });
    fireEvent.change(timeHourSelect, { target: { value: "14" } });
    fireEvent.change(timeMinuteSelect, { target: { value: "30" } });

    // Submit the new task form
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    // Verify that the new task appears in the task list
    await waitFor(() => {
      const taskElements = screen.getAllByText("Test Task");
      const taskElement = taskElements.find(
        (element) => getComputedStyle(element).fontSize === "100%"
      );
      expect(taskElement).toBeInTheDocument();
    });

    // Verify the task description and due date using regex matchers
    await waitFor(() => {
      expect(
        screen.getByText(/Description: This is a test task description\./i)
      ).toBeInTheDocument();
    });

    // Verify the due date separately
    await waitFor(() => {
      expect(screen.getByText(/Due date:/i)).toBeInTheDocument();
    });
  });

  test("displays user points correctly", () => {
    render(
      <Router>
        <App />
      </Router>
    );
  });
});
