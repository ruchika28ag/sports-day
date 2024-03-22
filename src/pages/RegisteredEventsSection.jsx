import React, { useMemo } from "react"
import styles from "./Home.module.css"
import EventCard from "../components/EventCard/EventCard"

const RegisteredEventsSection = ({
  setRegisteredEvents,
  setEvents,
  registeredEvents = []
}) => {
  const sortedEvents = useMemo(
    () =>
      registeredEvents.sort(
        (e1, e2) => new Date(e1.start_time) - new Date(e2.start_time)
      ),
    [registeredEvents]
  )

  const handleEventDeRegister = (sportEvent) => {
    setRegisteredEvents((s) => s.filter((sport) => sport.id !== sportEvent.id))
    setEvents((s) => [...s, sportEvent])
  }

  return (
    <div className={styles.registeredListSection}>
      <h4>Registered Events</h4>
      <div className={styles.registeredListContainer}>
        {sortedEvents.map((registeredEvent) => {
          return (
            <EventCard
              sportEvent={registeredEvent}
              actionBtnText={"De-Register"}
              onActionBtnClick={handleEventDeRegister}
              actionBtnVariant={"secondary"}
              key={registeredEvent.id}
            />
          )
        })}
      </div>
    </div>
  )
}

export default RegisteredEventsSection
