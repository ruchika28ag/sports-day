import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import AllEvents from "../AllEvents"
import mockEvents from "../../mockData/events.json"
import { toast } from "react-toastify"

describe("AllEvents component", () => {
  test("renders without crashing", () => {
    const events = [mockEvents[0], mockEvents[1]]
    render(<AllEvents events={events} />)
  })

  test("renders correct number of EventCard components", () => {
    const events = [mockEvents[0], mockEvents[1]]
    render(<AllEvents events={events} />)

    expect(screen.getAllByRole("button")).toHaveLength(events.length)
  })

  test("displays message when no events available", () => {
    render(<AllEvents />)
    expect(
      screen.getByText("No events available to register.")
    ).toBeInTheDocument()
  })

  test("Should have disabled Register button", async () => {
    const events = [mockEvents[1]]
    const registeredEvents = [mockEvents[0], mockEvents[2]]
    const updateEventStatus = jest.fn()

    render(
      <AllEvents
        events={events}
        registeredEvents={registeredEvents}
        updateEventStatus={updateEventStatus}
      />
    )

    const registerButton = screen.getByRole("button", {
      name: "Register"
    })
    fireEvent.click(registerButton)
    expect(registerButton).toBeDisabled()
  })

  test("Should show error on selecting more than 3 events", async () => {
    const events = [mockEvents[9]]
    const registeredEvents = [mockEvents[0], mockEvents[2], mockEvents[4]]
    const updateEventStatus = jest.fn()
    jest.mock("react-toastify", () => ({
      toast: {
        success: jest.fn()
      }
    }))

    render(
      <AllEvents
        events={events}
        registeredEvents={registeredEvents}
        updateEventStatus={updateEventStatus}
      />
    )

    const registerButton = screen.getByText("Register")
    fireEvent.click(registerButton)

    expect(await screen.findByText(/Cannot/)).toBeInTheDocument()
  })

  // test("Should register an event when clicked on register button", () => {
  //   const events = [mockEvents[5]]
  //   const registeredEvents = [mockEvents[0], mockEvents[2]]
  //   const updateEventStatus = jest.fn()

  //   render(
  //     <AllEvents
  //       events={events}
  //       registeredEvents={registeredEvents}
  //       updateEventStatus={updateEventStatus}
  //     />
  //   )

  //   const registerButton = screen.getByText("Register")
  //   fireEvent.click(registerButton)

  //   expect(updateEventStatus).toHaveBeenCalledTimes(1)
  //   expect(updateEventStatus).toHaveBeenCalledWith(1, "register")
  // })

  // test("handles event registration correctly", () => {
  //   const MAX_SELECTABLE_EVENTS = 0

  //   render(
  //     <AllEvents
  //       events={mockEvents}
  //       updateEventStatus={mockUpdateEventStatus}
  //     />
  //   )
  //   const registerButtons = screen.getByRole("button", { name: "Register" })
  //   fireEvent.click(registerButtons[0])

  //   expect(mockUpdateEventStatus).toHaveBeenCalledTimes(1)
  // })

  // test("identifies disabled events correctly", () => {
  //   render(
  //     <AllEvents events={mockEvents} registeredEvents={mockRegisteredEvents} />
  //   )
  //   const disabledEvent = mockEvents[0]
  //   const registerButton = screen.getByRole("button", { name: "Register" })
  //   fireEvent.click(registerButton)
  //   expect(registerButton).toBeDisabled()
  //   expect(
  //     screen.getByText("Cannot register overlapping or past events")
  //   ).toBeInTheDocument()
  // })

  // Add more tests for other functionalities as needed...
})
