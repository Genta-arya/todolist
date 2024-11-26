import React, { useEffect } from "react";
import { ClerkLoading, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import ModalLoading from "./Loading";

function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/login");
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded) {
    return <ModalLoading />;
  }

  return isSignedIn ? children : <ModalLoading />;
}

export default ProtectedRoute;
