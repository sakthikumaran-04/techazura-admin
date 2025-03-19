import Home from "./components/Home"
import { BrowserRouter , Routes ,Route } from "react-router-dom"
import SingleParticipant from "./components/SingleParticipant"
import LoginPage from "./Login"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <>
    <BrowserRouter>
    <Toaster />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/participant/:id" element={<SingleParticipant />} />
      </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
