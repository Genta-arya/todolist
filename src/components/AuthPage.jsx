import React from "react";
import { SignIn } from "@clerk/clerk-react";


function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-[#36d7b7] hover:bg-[#34c29f] text-white",
            formButtonSecondary: "bg-gray-300 hover:bg-gray-400 text-gray-700",
            formFieldInput: "",
            formFieldLabel: "text-gray-600",
            formErrorText: "text-red-500 text-sm",
          },
        }}
        
        signUpUrl="/signup"
      />
    </div>
  );
}

export default LoginPage;
