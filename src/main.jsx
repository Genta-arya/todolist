import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider, RedirectToSignIn, useClerk } from "@clerk/clerk-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./index.css";
import App from "./App";
import LoginPage from "./components/AuthPage";

// Ambil publishable key dari environment
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Router>
        <Routes>
          {/* Halaman login */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Halaman utama */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ClerkProvider>
  </React.StrictMode>
);
