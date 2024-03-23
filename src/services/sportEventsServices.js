import { apiEndpoints, requestMethodType } from "./apiConstants"
import makeApiCall from "./fetcher"
import { toast } from "react-toastify"

const fetchAllEvents = async () => {
  try {
    const allEvents = await makeApiCall(
      requestMethodType.GET,
      apiEndpoints.allEventsList
    )
    return allEvents
  } catch (error) {
    toast.error(
      error.error ?? "Unable to fetch events. Try again in some time."
    )
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
    toast.error(
      error.error ??
        "Unable to fetch registered events. Try again in some time."
    )
    throw error
  }
}

const updateUserEvents = async (userId, eventId, action) => {
  const pathParams = { userId, eventId }
  const requestBody = { action }
  try {
    const response = await makeApiCall(
      requestMethodType.POST,
      apiEndpoints.updateUserEvent,
      pathParams,
      {},
      requestBody
    )
    toast.success(response.message)
    return
  } catch (error) {
    toast.error(error.error ?? "Unable to update.")
    throw error
  }
}

export { fetchAllEvents, fetchUserRegisteredEvents, updateUserEvents }
