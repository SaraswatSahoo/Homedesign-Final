import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import BookASession from "./pages/BookASession";
import ViewOnVR from "./pages/ViewOnVR";

export default function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/bookasession" element={<BookASession />} />
          <Route path="/viewonvr" element={<ViewOnVR />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}