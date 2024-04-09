import { fireEvent, render, screen } from "@testing-library/react"
import EventCard from "./EventCard"
import mockData from "../../mockData/events.json"
import { userEvent } from "@testing-library/user-event"

describe("Event Card", () => {
  test("Should have enabled button", () => {
    render(<EventCard sportEvent={mockData[0]} actionBtnText={"Register"} />)

    const actionBtn = screen.getByRole("button", { name: "Register" })

    expect(actionBtn).toBeInTheDocument()
    expect(actionBtn).not.toBeDisabled()
    expect(actionBtn).not.toHaveClass("disabledActionBtn")
  })

  test("Should have disabled button", () => {
    render(
      <EventCard
        sportEvent={mockData[8]}
        actionBtnText={"Register"}
        isDisabled={true}
      />
    )

    const actionBtn = screen.getByRole("button", { name: "Register" })

    expect(actionBtn).toBeInTheDocument()
    expect(actionBtn).toBeDisabled()
    expect(actionBtn).toHaveClass("disabledActionBtn")
  })

  test("Should call Action Button Click Handler", () => {
    const mockHandleClick = jest.fn()
    render(
      <EventCard
        sportEvent={mockData[5]}
        actionBtnText={"Unregister"}
        onActionBtnClick={mockHandleClick}
      />
    )
    const actionBtn = screen.getByRole("button", { name: "Unregister" })
    fireEvent.click(actionBtn)

    expect(mockHandleClick).toHaveBeenCalled()
  })
})
