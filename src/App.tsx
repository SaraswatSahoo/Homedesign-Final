import { BrowserRouter, Route, Routes } from "react-router";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

export default function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}