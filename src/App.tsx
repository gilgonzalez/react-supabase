import Home from "./pages/Home"
import Login from "./pages/Login"
import { Route, Routes } from "react-router-dom"
import NotFound from "./pages/NotFound"

function App() {

  return (
    <>
      <Routes>
        <Route  path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
