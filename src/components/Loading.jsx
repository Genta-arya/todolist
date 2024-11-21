import React from "react";
import { ScaleLoader } from "react-spinners";

const ModalLoading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-md flex items-center">
        <ScaleLoader color="#36d7b7" />
      </div>
    </div>
  );
};

export default ModalLoading;
