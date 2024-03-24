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

const AllEvents = ({
  events = [],
  registeredEvents = [],
  setRegisteredEvents,
  setEvents,
  setIsLoading,
  statusUpdatingEvent,
  setStatusUpdatingEvent
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

  const checkIfEventDisabled = (sportEvent) =>
    disabledEvents?.some((disabledEvent) => disabledEvent.id === sportEvent.id)

  const handleEventRegister = (sportEvent) => {
    if (registeredEvents.length >= 3) {
      toast.error("Cannot register in more than 3 events")
      return
    }
    if (
      disabledEvents?.some(
        (disabledEvent) => disabledEvent.id === sportEvent.id
      )
    ) {
      toast.error("Cannot register overlapping or past events")
      return
    }
    const updateEvents = async () => {
      try {
        setStatusUpdatingEvent(sportEvent.id)
        await updateUserEvents(
          LOGGED_IN_USER_ID,
          sportEvent.id,
          EVENT_ACTIONS.REGISTER
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
