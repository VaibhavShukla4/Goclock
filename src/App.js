import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { CiDark, CiLight } from "react-icons/ci";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

// this is for protected routes
const ProtectedLayout = ({ children }) => {
  const auth = localStorage.getItem("auth_token");
  return auth ? (
    <div>
      <Navigate to="/account" replace={true} />
      {children}
    </div>
  ) : (
    <Navigate to="/" replace={true} />
  );
};

function App() {
  const [mode, setMode] = useState(false);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            setMode={setMode}
            mode={mode}
            CiDark={CiDark}
            CiLight={CiLight}
          />
        }
      />
      <Route
        path="/account/*"
        element={
          <ProtectedLayout>
            <Account />
          </ProtectedLayout>
        }
      >
        <Route
          index
          element={<Home mode={mode} CiDark={CiDark} CiLight={CiLight} />}
        />
      </Route>
      <Route
        path="/login"
        element={
          <Login
            setMode={setMode}
            mode={mode}
            CiDark={CiDark}
            CiLight={CiLight}
          />
        }
      />
      <Route
        path="/signup"
        element={
          <SignUp
            setMode={setMode}
            mode={mode}
            CiDark={CiDark}
            CiLight={CiLight}
          />
        }
      />
    </Routes>
  );
}

export default App;
