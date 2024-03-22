import React from "react"
import styles from "./Button.module.css"
const Button = ({ text, variant, onClick, disabled }) => {
  const btnClassName = disabled
    ? "disabledActionBtn"
    : variant === "secondary"
    ? "secondaryActionBtn"
    : "actionBtn"

  return (
    <button
      className={styles[btnClassName]}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
