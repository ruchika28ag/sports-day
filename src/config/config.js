let hostUrl
switch (process.env.REACT_APP_ENV) {
  case "local":
    hostUrl = "http://localhost:8080"
    break
  case "stage":
    hostUrl = "http://localhost:8080"
    break
  case "prod":
    hostUrl = "http://localhost:8080"
    break
  default:
    hostUrl = "http://localhost:8080"
}

export default hostUrl
