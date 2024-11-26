import React from "react";
import Navbar from "./Navbar";

const Container = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
        {children}
      </div>
    </>
  );
};

export default Container;
