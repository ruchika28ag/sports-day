import React from "react"
import styles from "./Spinner.module.css"

const Spinner = ({ size = "medium" }) => {
  return (
    <div className={styles.spinnerContainer}>
      <div
        className={`${styles.spinner} ${
          size === "small" ? styles.smallSpinner : ""
        }`}
      ></div>
    </div>
  )
}

export default Spinner
