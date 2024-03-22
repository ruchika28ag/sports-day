import React, { useEffect, useMemo, useState } from "react"
import styles from "./Home.module.css"
import EventCard from "../components/EventCard/EventCard"

const AllEvents = ({
  events = [],
  registeredEvents = [],
  setRegisteredEvents,
  setEvents
}) => {
  const [disabledEvents, setDisabledEvents] = useState()
  const sortedEvents = useMemo(
    () =>
      events.sort(
        (e1, e2) => new Date(e1.start_time) - new Date(e2.start_time)
      ),
    [events]
  )

  useEffect(() => {
    const filteredSportsEvents = sortedEvents.filter((event) => {
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
    setDisabledEvents(filteredSportsEvents)
  }, [registeredEvents, sortedEvents])

  const handleEventRegister = (sportEvent) => {
    if (registeredEvents.length >= 3) return
    if (
      disabledEvents.some((disabledEvent) => disabledEvent.id === sportEvent.id)
    )
      return
    setRegisteredEvents((s) => [...s, sportEvent])
    setEvents((s) => s.filter((sport) => sport.id !== sportEvent.id))
  }

  const checkIfEventDisabled = (sportEvent) =>
    disabledEvents.some((disabledEvent) => disabledEvent.id === sportEvent.id)

  return (
    <div className={styles.allEventsSection}>
      {sortedEvents.map((sportEvent) => {
        const isDisabled = checkIfEventDisabled(sportEvent)
        return (
          <EventCard
            sportEvent={sportEvent}
            isDisabled={isDisabled}
            actionBtnText={"Register"}
            onActionBtnClick={handleEventRegister}
            key={sportEvent.id}
          />
        )
      })}
    </div>
  )
}

export default AllEvents
