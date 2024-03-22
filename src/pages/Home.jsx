import React, { useEffect, useState } from "react"

import dummyEvents from "../mockData/events.json"

import styles from "./Home.module.css"
import AllEvents from "./AllEvents"
import RegisteredEventsSection from "./RegisteredEventsSection"

const Home = () => {
  const [events, setEvents] = useState([])
  const [registeredEvents, setRegisteredEvents] = useState([])

  useEffect(() => {
    setEvents(dummyEvents)
  }, [])

  return (
    <div className={styles.home}>
      <AllEvents
        events={events}
        registeredEvents={registeredEvents}
        setRegisteredEvents={setRegisteredEvents}
        setEvents={setEvents}
      />
      <RegisteredEventsSection
        registeredEvents={registeredEvents}
        setEvents={setEvents}
        setRegisteredEvents={setRegisteredEvents}
      />
    </div>
  )
}

export default Home
