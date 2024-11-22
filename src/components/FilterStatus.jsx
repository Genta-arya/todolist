import React from "react";

const FilterStatus = ({
    handleStatusFilter,
    statusFilter
}) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={() => handleStatusFilter("all")}
        className={`${
          statusFilter === "all"
            ? "bg-green-300 text-white font-bold"
            : "bg-gray-200"
        } px-3 py-1 rounded-lg `}
      >
        All
      </button>
      <button
        onClick={() => handleStatusFilter("completed")}
        className={`${
          statusFilter === "completed"
            ? "bg-green-300 text-white font-bold"
            : "bg-gray-200"
        } px-3 py-1 rounded-lg`}
      >
        Completed
      </button>
      <button
        onClick={() => handleStatusFilter("pending")}
        className={`${
          statusFilter === "pending"
            ? "bg-red-300 text-white font-bold"
            : "bg-gray-200"
        } px-3 py-1 rounded-lg`}
      >
        Pending
      </button>
    </div>
  );
};

export default FilterStatus;
