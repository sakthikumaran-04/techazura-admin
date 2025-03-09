import Home from "./components/Home"
import { BrowserRouter , Routes ,Route } from "react-router-dom"
import SingleParticipant from "./components/SingleParticipant"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/participant/:id" element={<SingleParticipant />} />
      </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
