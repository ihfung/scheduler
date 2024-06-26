import React from "react";

import { render, cleanup, getByText, fireEvent, prettyDOM, findByText, getAllByTestId, getByAltText, getByPlaceholderText, waitForElement, queryByText,queryByAltText, findByAltText } from "@testing-library/react";


import Application from "components/Application";
import axios from "axios";
afterEach(cleanup);

describe("Application", () => {
   
it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  const { queryByText, getByText,findByText } = render(<Application />);

  await findByText("Monday");

  fireEvent.click(getByText("Tuesday"));
  expect(queryByText("Leopold Silvers")).toBeInTheDocument();
});


it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug} = render(<Application />);
    await findByText(container, "Archie Cohen");
   
    const appointments = getAllByTestId(container, "appointment");
     
  
    const appointment = appointments[0];
    

    fireEvent.click(getByAltText(appointment, "Add"));
   
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));

   
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
});

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await findByText(container, "Archie Cohen");

  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find((appointment) =>
    queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));

  // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(queryByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  // 7. Wait until the element with the "Add" button is displayed.
  await findByAltText(appointment, "Add");

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));

  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Edit" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find((appointment) =>
    queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Edit"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  // 4. Check that edit form is shown.
  expect(getByText(appointment, "Interviewer")).toBeInTheDocument();

  // 5. Click the "Save" button on the confirmation.

  //6. Check that the element with the text "Saving" is displayed.
  fireEvent.click(queryByText(appointment, "Save"));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));

  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

});



it("shows the save error when failing to save an appointment", async () => {
  axios.put.mockRejectedValueOnce();
  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen")); 

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText(appointment, "Save"));
  
  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(() => getByText(container, "Error"));
  expect(getByText(appointment, "Could not book appointment.")). toBeInTheDocument();
  debug();
});

it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
    // 4. Check that the confirmation message is shown.
    
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    fireEvent.click(queryByText(appointment, "Confirm"));
  
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => getByText(container, "Error"));
    expect(getByText(appointment, "Could not cancel appointment.")).toBeInTheDocument();
    debug()
  });

});


//getByText is used to find elements by text content
//fireEvent is used to simulate events on elements like click events
//prettyDOM is used to log the DOM as a string to the console
// findByText is used to find elements by text content asynchronously 
// getAllByTestId is used to find elements by the data-testid attribute like <div data-testid="some-value">
// getByAltText is used to find elements by alt text like <img alt="">
// getByPlaceholderText is used to find elements by placeholder text like <input placeholder="">
// waitForElement is used to wait for an element to appear in the DOM
// queryByText is used to find elements by text content like getByText but it returns null if no element is found
// queryByAltText is used to find elements by alt text like getByAltText but it returns null if no element is found like queryByText but for alt text
// findByAltText is used to find elements by alt text asynchronously like findByText but it returns null if no element is found