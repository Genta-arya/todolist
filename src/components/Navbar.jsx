import React from "react";
import { UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 lg:px-16 bg-gray-100 border-b shadow-2xl  ">
      <div className="text-xl font-bold">My Todo's</div>
      <div className="flex items-center">
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
