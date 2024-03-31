import React, { useEffect, useMemo, useState } from "react"

import styles from "./Home.module.css"
import AllEvents from "./AllEvents"
import RegisteredEventsSection from "./RegisteredEventsSection"
import {
  fetchAllEvents,
  fetchUserRegisteredEvents,
  updateUserEvents
} from "../services/sportEventsServices"
import { LOGGED_IN_USER_ID } from "../constants/constants"
import Spinner from "../components/Spinner/Spinner"

const Home = () => {
  const [allEvents, setAllEvents] = useState([])
  const [registeredEvents, setRegisteredEvents] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [statusUpdatingEvent, setStatusUpdatingEvent] = useState()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true)
        const events = await Promise.all([
          fetchAllEvents(),
          fetchUserRegisteredEvents(LOGGED_IN_USER_ID)
        ])
        setAllEvents(events[0])
        setRegisteredEvents(events[1])
      } catch (error) {
        console.log("Error", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const unregisteredEvents = useMemo(
    () =>
      allEvents.filter(
        (sportEvent) =>
          !registeredEvents.some(
            (registeredEvent) => registeredEvent.id === sportEvent.id
          )
      ),
    [allEvents, registeredEvents]
  )

  const handleUserEventAction = async (eventId, action) => {
    try {
      setStatusUpdatingEvent(eventId)
      await updateUserEvents(LOGGED_IN_USER_ID, eventId, action)
      setIsLoading(true)
      const registeredEvents = await fetchUserRegisteredEvents(
        LOGGED_IN_USER_ID
      )
      setRegisteredEvents(registeredEvents)
    } catch (error) {
      console.error("Error", error)
    } finally {
      setStatusUpdatingEvent(null)
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.home}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <AllEvents
            events={unregisteredEvents}
            registeredEvents={registeredEvents}
            statusUpdatingEvent={statusUpdatingEvent}
            updateEventStatus={handleUserEventAction}
          />
          <RegisteredEventsSection
            registeredEvents={registeredEvents}
            statusUpdatingEvent={statusUpdatingEvent}
            updateEventStatus={handleUserEventAction}
          />
        </>
      )}
    </div>
  )
}

export default Home
