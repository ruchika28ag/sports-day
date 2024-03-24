import React, { useEffect, useMemo, useState } from "react"
import styles from "./Home.module.css"
import EventCard from "../components/EventCard/EventCard"
import {
  fetchAllEvents,
  fetchUserRegisteredEvents,
  updateUserEvents
} from "../services/sportEventsServices"
import { EVENT_ACTIONS, LOGGED_IN_USER_ID } from "../constants/constants"
import { toast } from "react-toastify"

const RegisteredEventsSection = ({
  setRegisteredEvents,
  setEvents,
  registeredEvents = [],
  setIsLoading,
  statusUpdatingEvent,
  setStatusUpdatingEvent
}) => {
  const [disabledEvents, setDisabledEvents] = useState()
  const sortedEvents = useMemo(
    () =>
      registeredEvents.sort(
        (e1, e2) => new Date(e1.start_time) - new Date(e2.start_time)
      ),
    [registeredEvents]
  )

  useEffect(() => {
    const filteredSportsEvents = sortedEvents.filter((event) => {
      const today = new Date()
      const eventStartDate = new Date(event.start_time)
      return eventStartDate < today
    })
    setDisabledEvents(filteredSportsEvents)
  }, [registeredEvents, sortedEvents])

  const checkIfEventDisabled = (sportEvent) =>
    disabledEvents?.some((disabledEvent) => disabledEvent.id === sportEvent.id)

  const handleEventUnregister = (sportEvent) => {
    if (
      disabledEvents?.some(
        (disabledEvent) => disabledEvent.id === sportEvent.id
      )
    ) {
      toast.error("Can not unregister past events.")
      return
    }
    const updateEvents = async () => {
      try {
        setStatusUpdatingEvent(sportEvent.id)
        await updateUserEvents(
          LOGGED_IN_USER_ID,
          sportEvent.id,
          EVENT_ACTIONS.UNREGISTER
        )
        setIsLoading(true)
        const events = await Promise.all([
          fetchAllEvents(),
          fetchUserRegisteredEvents(LOGGED_IN_USER_ID)
        ])
        setEvents(events[0])
        setRegisteredEvents(events[1])
      } catch (error) {
        console.log("Error", error)
      } finally {
        setStatusUpdatingEvent(null)
        setIsLoading(false)
      }
    }
    updateEvents()
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
