import React from "react";
import { SignIn } from "@clerk/clerk-react";

function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <SignIn />
    </div>
  );
}

export default LoginPage;
