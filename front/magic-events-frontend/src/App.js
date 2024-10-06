import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./static/css/style.css";
import SignInForm from "./components/SignIn";
import SignUpForm from "./components/SignUp";
import Events from "./components/EventsPage";

export default function App() {
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <h2>Sign in/up Form</h2>
              <div className={`container ${type === "signUp" ? "right-panel-active" : ""}`} id="container">
                <SignUpForm />
                <SignInForm />
                <div className="overlay-container">
                  <div className="overlay">
                    <div className="overlay-panel overlay-left">
                      <h1>Welcome Back!</h1>
                      <p>To keep connected with us please login with your personal info</p>
                      <button className="ghost" id="signIn" onClick={() => handleOnClick("signIn")}>
                        Sign In
                      </button>
                    </div>
                    <div className="overlay-panel overlay-right">
                      <h1>Hello, Friend!</h1>
                      <p>Enter your personal details and start the journey with us</p>
                      <button className="ghost" id="signUp" onClick={() => handleOnClick("signUp")}>
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <Route path="/events" element={<Events />} />
      </Routes>
    </Router>
  );
}
