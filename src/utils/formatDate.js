export const getDateTimeString = (dateString) => {
  const date = new Date(dateString)
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: userTimeZone
  }
  const formattedDate = date.toLocaleDateString("en-US", options)
  let t = 0
  const result = formattedDate.replace(/,/g, (match) =>
    ++t === 2 ? "" : match
  )

  return result
}

export const getFromToTimeString = (start_time, end_time) => {
  const startTime = new Date(start_time)
  const endTime = new Date(end_time)

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const options = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: userTimeZone
  }

  const formattedStartTime = startTime.toLocaleTimeString("en-US", options)
  const formattedEndTime = endTime.toLocaleTimeString("en-US", options)

  const formattedRange = `${formattedStartTime} - ${formattedEndTime}`

  return formattedRange
}
