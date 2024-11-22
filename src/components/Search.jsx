import React from "react";

const Search = ({ handleSearch, searchTerm }) => {
  return (
    <div className="flex items-center bg-gray-100 p-2 rounded-lg mb-4">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 border outline-none border-gray-300 rounded-lg"
      />
    </div>
  );
};

export default Search;
