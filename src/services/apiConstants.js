export const apiEndpoints = {
  allEventsList: "/events",
  registeredEventsList: "/user/:userId/events",
  updateUserEvent: "/user/:userId/events/:eventId"
}

export const requestMethodType = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT"
}
