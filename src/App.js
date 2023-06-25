import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { CiDark, CiLight } from "react-icons/ci";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { ToastProvider } from "react-toast-notifications";
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
    <ToastProvider autoDismiss={true} autoDismissTimeout="2000">
      <Routes>
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
            element={
              <Home
                mode={mode}
                CiDark={CiDark}
                CiLight={CiLight}
                setMode={setMode}
              />
            }
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
          path="/"
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
    </ToastProvider>
  );
}

export default App;
