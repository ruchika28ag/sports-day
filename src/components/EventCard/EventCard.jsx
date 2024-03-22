import React from "react"

import styles from "./EventCard.module.css"
import { getDateTimeString, getFromToTimeString } from "../../utils/formatDate"
import Label from "../Label/Label"
import Button from "../Button/Button"

const EventCard = ({
  sportEvent,
  isDisabled,
  actionBtnText,
  actionBtnVariant,
  onActionBtnClick
}) => {
  const getCategoryClass = (category) => {
    switch (category) {
      case "Athletics":
        return "positive"
      case "Swimming":
        return "primary"
      case "Boxing":
        return "negative"
      default:
        return "warning"
    }
  }
  return (
    <div
      className={`${styles.eventCard} ${
        isDisabled ? styles.disabledEventCard : ""
      }`}
      key={sportEvent.id}
    >
      <span className={styles.title}>{sportEvent.event_name}</span>
      <Label
        text={sportEvent.event_category}
        variant={getCategoryClass(sportEvent.event_category)}
      />

      <div className={styles.timeContainer}>
        <div className={styles.timeLine}>
          <img
            src='https://www.svgrepo.com/show/6230/clock.svg'
            alt='clock-icon'
            height={16}
          />
          <span className={styles.timeText}>
            {getFromToTimeString(sportEvent.start_time, sportEvent.end_time)}
          </span>
        </div>
        <div className={styles.timeLine}>
          <img
            src='https://www.svgrepo.com/show/533388/calendar-day.svg'
            alt='calendar-icon'
            height={16}
          />

          <span>{getDateTimeString(sportEvent.start_time)}</span>
        </div>
      </div>
      <div className={styles.actionBtnContainer}>
        <Button
          text={actionBtnText}
          variant={actionBtnVariant}
          onClick={() => onActionBtnClick(sportEvent)}
          disabled={isDisabled}
        />
      </div>
    </div>
  )
}

export default EventCard
