import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider, SignUp } from "@clerk/clerk-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./index.css";
import App from "./App";
import LoginPage from "./components/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} fallbackRedirectUrl="/">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/signup"
            element={
              <>
                <div className="flex justify-center h-screen items-center">
                  <SignUp signInUrl="/login" />
                </div>
              </>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <App />
                {" "}
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ClerkProvider>
  </React.StrictMode>
);
