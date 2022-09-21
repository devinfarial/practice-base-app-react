import SigninPage from "./modules/SigninPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./modules/HomePage";
import SignupPage from "./modules/SignupPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/signin" element={<SigninPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}