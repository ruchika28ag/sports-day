import React, { useMemo } from "react"
import styles from "./Home.module.css"
import EventCard from "../components/EventCard/EventCard"
import { toast } from "react-toastify"
import { EVENT_ACTIONS } from "../constants/constants"

const RegisteredEventsSection = ({
  registeredEvents = [],
  statusUpdatingEvent,
  updateEventStatus
}) => {
  const sortedEvents = useMemo(
    () =>
      registeredEvents.sort(
        (e1, e2) => new Date(e1.start_time) - new Date(e2.start_time)
      ),
    [registeredEvents]
  )

  const disabledEvents = useMemo(
    () =>
      sortedEvents.filter((event) => {
        const today = new Date()
        const eventStartDate = new Date(event.start_time)
        return eventStartDate < today
      }),
    [sortedEvents]
  )

  const checkIfEventDisabled = (sportEvent) =>
    disabledEvents?.some((disabledEvent) => disabledEvent.id === sportEvent.id)

  const handleEventUnregister = (sportEvent) => {
    if (
      disabledEvents?.some(
        (disabledEvent) => disabledEvent.id === sportEvent.id
      )
    ) {
      return toast.error("Can not unregister past events.")
    }

    updateEventStatus(sportEvent.id, EVENT_ACTIONS.UNREGISTER)
  }

  return (
    <div className={styles.registeredListSection}>
      <h4>Registered Events</h4>
      {sortedEvents.length ? (
        <div className={styles.registeredListContainer}>
          {sortedEvents.map((registeredEvent) => {
            const isDisabled = checkIfEventDisabled(registeredEvent)

            return (
              <EventCard
                sportEvent={registeredEvent}
                actionBtnText={"Unregister"}
                onActionBtnClick={handleEventUnregister}
                actionBtnVariant={
                  registeredEvent.id === statusUpdatingEvent
                    ? "loading"
                    : statusUpdatingEvent
                    ? "disabled"
                    : "secondary"
                }
                key={registeredEvent.id}
                isDisabled={isDisabled}
              />
            )
          })}
        </div>
      ) : (
        <span>You have not registered to any event.</span>
      )}
    </div>
  )
}

export default RegisteredEventsSection
