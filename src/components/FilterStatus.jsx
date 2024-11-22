import React from "react";

const FilterStatus = ({ handleStatusFilter, todos, statusFilter }) => {
  return (
    <>
      {todos.length > 0 && (
        <div className="flex space-x-4">
          <button
            onClick={() => handleStatusFilter("all")}
            className={`${
              statusFilter === "all"
                ? "bg-green-300 text-white font-bold"
                : "bg-gray-200"
            } px-3 py-1 rounded-lg hover:scale-95 w-24 transition-all ease-in duration-200`}
          >
            All
          </button>
          <button
            onClick={() => handleStatusFilter("completed")}
            className={`${
              statusFilter === "completed"
                ? "bg-green-300 text-white font-bold"
                : "bg-gray-200"
            } px-3 py-1 rounded-lg hover:scale-95 w-24 transition-all ease-in duration-200`}
          >
            Completed
          </button>
          <button
            onClick={() => handleStatusFilter("pending")}
            className={`${
              statusFilter === "pending"
                ? "bg-red-300 text-white font-bold"
                : "bg-gray-200"
            } px-3 py-1 rounded-lg hover:scale-95 w-24 transition-all ease-in duration-200`}
          >
            Pending
          </button>
        </div>
      )}
    </>
  );
};

export default FilterStatus;
