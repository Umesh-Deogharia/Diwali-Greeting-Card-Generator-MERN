import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";
import HomeComponent from "./components/HomeComponent/HomeComponent";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import LandingPage from "./components/LandingPage/LandingPage";
import SignupComponent from "./components/SignupComponent/SignupComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <LandingPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
          {/* <Route path="/landing" element={<LandingPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
