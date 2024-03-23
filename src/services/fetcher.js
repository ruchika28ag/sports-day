import axios from "axios"
import hostUrl from "../config/config"

const api = axios.create({
  hostUrl
})

const makeApiCall = async (
  method,
  endpoint,
  pathParams = {},
  queryParams = {},
  requestBody = {}
) => {
  let url = hostUrl + endpoint
  for (const param in pathParams) {
    url = url.replace(`:${param}`, pathParams[param])
  }

  try {
    let response
    if (method === "GET") {
      response = await api.get(url, { params: queryParams })
    } else if (method === "POST") {
      response = await api.post(url, requestBody, { params: queryParams })
    }
    return response.data
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.error("Resource not found:", error.response.data)
      } else if (error.response.status === 500) {
        console.error("Internal server error:", error.response.data)
      } else {
        console.error("Server error:", error.response.data)
      }
    } else if (error.request) {
      console.error("No response received:", error.request)
    } else {
      console.error("Error setting up the request:", error.message)
    }
    throw error
  }
}

export default makeApiCall
