import { apiEndpoints, requestMethodType } from "./apiConstants"
import makeApiCall from "./fetcher"

const fetchAllEvents = async () => {
  try {
    const allEvents = await makeApiCall(
      requestMethodType.GET,
      apiEndpoints.allEventsList
    )
    return allEvents
  } catch (error) {
    console.error("Error:", error)
    console.log("show toast")
    throw error
  }
}

const fetchUserRegisteredEvents = async (userId) => {
  const pathParams = { userId }
  try {
    const userRegisteredEvents = await makeApiCall(
      requestMethodType.GET,
      apiEndpoints.registeredEventsList,
      pathParams
    )
    return userRegisteredEvents
  } catch (error) {
    console.error("Error:", error)
    console.log("show toast")
    throw error
  }
}

const updateUserEvents = async (userId, eventId, action) => {
  const pathParams = { userId, eventId }
  const requestBody = { action }
  try {
    await makeApiCall(
      requestMethodType.POST,
      apiEndpoints.updateUserEvent,
      pathParams,
      {},
      requestBody
    )
    return
  } catch (error) {
    console.error("Error:", error)
    console.log("show toast")
    throw error
  }
}

export { fetchAllEvents, fetchUserRegisteredEvents, updateUserEvents }
