import React from "react"
import styles from "./Label.module.css"

const Label = ({ text, variant }) => {
  return <span className={`${styles.label} ${styles[variant]}`}>{text}</span>
}

export default Label
