import "./App.css"
import Home from "./pages/Home"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <div className='App'>
      <ToastContainer newestOnTop draggable />
      <div className='App-header'>Sports Day</div>
      <Home />
    </div>
  )
}

export default App
