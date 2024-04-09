// import { render, waitFor, act, screen } from "@testing-library/react"
// import "@testing-library/jest-dom/extend-expect"
// import {
//   fetchAllEvents,
//   fetchUserRegisteredEvents
// } from "../../services/sportEventsServices"
// import mockAllEvents from "../../mockData/events.json"
// import Home from "../Home"

// jest.mock("../../services/sportEventsServices")

// describe("Home component", () => {
//   const mockRegisteredEvents = [mockAllEvents[0], mockAllEvents[5]]

//   beforeEach(() => {
//     fetchAllEvents.mockResolvedValue(mockAllEvents)
//     fetchUserRegisteredEvents.mockResolvedValue(mockRegisteredEvents)
//   })

//   test("renders without crashing", async () => {
//     render(<Home />)
//   })

//   // test("fetches events and registered events on mount", async () => {
//   //   render(<Home />)
//   //   await waitFor(() => expect(fetchAllEvents).toHaveBeenCalledTimes(1))
//   //   await waitFor(() =>
//   //     expect(fetchUserRegisteredEvents).toHaveBeenCalledTimes(1)
//   //   )
//   // })

//   // test("renders spinner while loading", async () => {
//   //   render(<Home />)
//   //   expect(screen.getByTestId("spinner")).toBeInTheDocument()
//   // })

//   // test("renders AllEvents and RegisteredEventsSection when not loading", async () => {
//   //   await act(async () => {
//   //     render(<Home />)
//   //     await waitFor(() => expect(fetchAllEvents).toHaveBeenCalledTimes(1))
//   //     await waitFor(() =>
//   //       expect(fetchUserRegisteredEvents).toHaveBeenCalledTimes(1)
//   //     )
//   //   })
//   //   expect(screen.getByTestId("all-events")).toBeInTheDocument()
//   //   expect(screen.getByTestId("registered-events-section")).toBeInTheDocument()
//   // })

//   // // Add more tests as needed...
// })
