import React, { useMemo } from "react"
import styles from "./Home.module.css"
import EventCard from "../components/EventCard/EventCard"

import { EVENT_ACTIONS, MAX_SELECTABLE_EVENTS } from "../constants/constants"
import { toast } from "react-toastify"

const AllEvents = ({
  events = [],
  registeredEvents = [],
  statusUpdatingEvent,
  updateEventStatus
}) => {
  const sortedEvents = useMemo(
    () =>
      events.sort(
        (e1, e2) => new Date(e1.start_time) - new Date(e2.start_time)
      ),
    [events]
  )

  const disabledEvents = useMemo(() => {
    return sortedEvents.filter((event) => {
      const today = new Date()
      const eventStartDate = new Date(event.start_time)
      const eventStartTime = eventStartDate.getTime()
      const eventEndTime = new Date(event.end_time).getTime()

      const isInPast = eventStartDate < today

      const isSameSlotAsRegistered = registeredEvents.some(
        (registeredEvent) => {
          const bookedStartTime = new Date(registeredEvent.start_time).getTime()
          const bookedEndTime = new Date(registeredEvent.end_time).getTime()

          return (
            eventStartTime < bookedEndTime && eventEndTime > bookedStartTime
          )
        }
      )

      return isInPast || isSameSlotAsRegistered
    })
  }, [registeredEvents, sortedEvents])

  const checkIfEventDisabled = (sportEvent) =>
    disabledEvents?.some((disabledEvent) => disabledEvent.id === sportEvent.id)

  const handleEventRegister = (sportEvent) => {
    if (registeredEvents.length >= MAX_SELECTABLE_EVENTS) {
      return toast.error("Cannot register in more than 3 events")
    }
    if (
      disabledEvents?.some(
        (disabledEvent) => disabledEvent.id === sportEvent.id
      )
    ) {
      return toast.error("Cannot register overlapping or past events")
    }
    updateEventStatus(sportEvent.id, EVENT_ACTIONS.REGISTER)
  }

  return (
    <div className={styles.allEventsSection}>
      {sortedEvents.length ? (
        <div className={styles.allEventsListContainer}>
          {sortedEvents.map((sportEvent) => {
            const isDisabled = checkIfEventDisabled(sportEvent)

            return (
              <EventCard
                sportEvent={sportEvent}
                actionBtnText={"Register"}
                onActionBtnClick={handleEventRegister}
                isDisabled={isDisabled}
                key={sportEvent.id}
                actionBtnVariant={
                  sportEvent.id === statusUpdatingEvent
                    ? "loading"
                    : statusUpdatingEvent
                    ? "disabled"
                    : "primary"
                }
              />
            )
          })}
        </div>
      ) : (
        <span>No events available to register.</span>
      )}
    </div>
  )
}

export default AllEvents
