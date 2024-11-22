import React from "react";
import { FaPlus } from "react-icons/fa";

const FormTodo = ({ newTodo, setNewTodo, handleCreate }) => {
  return (
    <div className="w-full  md:max-w-[100%] lg:max-w-[90%] bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">New Todo</h2>
      <input
        type="text"
        placeholder="Title"
        maxLength={30}
        value={newTodo.title}
        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
      />
      <textarea
        placeholder="Description"
        value={newTodo.description}
        maxLength={100}
        onChange={(e) =>
          setNewTodo({ ...newTodo, description: e.target.value })
        }
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
      />
      <button
        onClick={handleCreate}
        className="w-full bg-[#36d7b7] text-white py-2 rounded-lg hover:bg-[#36d7b7] hover:shadow-lg"
      >
        <div className="flex items-center justify-center">
          <FaPlus />
          <span className="ml-2">Add Todo</span>
        </div>
      </button>
    </div>
  );
};

export default FormTodo;
