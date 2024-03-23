import React from "react"
import styles from "./Button.module.css"
import Spinner from "../Spinner/Spinner"
const Button = ({ text, variant, onClick, disabled }) => {
  const btnClassName =
    disabled || variant === "disabled"
      ? "disabledActionBtn"
      : variant === "secondary"
      ? "secondaryActionBtn"
      : "actionBtn"

  return (
    <button
      className={styles[btnClassName]}
      disabled={disabled || variant === "loading"}
      onClick={onClick}
    >
      {variant === "loading" ? <Spinner size='small' /> : text}
    </button>
  )
}

export default Button
