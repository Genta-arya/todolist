import React from "react";

const TrackStatus = ({ todos }) => {
  return (
    <div className="flex justify-center mt-4 font-bold text-sm">
      Completed ( {todos.filter((todo) => todo?.completed).length} / {todos.length}{" "}
      )
    </div>
  );
};

export default TrackStatus;
