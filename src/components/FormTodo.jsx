import React from "react";
import { FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";

const FormTodo = ({ newTodo, setNewTodo, handleCreate }) => {
  const titleVariants = {
    hidden: { opacity: 0, x: -150 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7 },
    },
  };

  const descVariants = {
    hidden: { opacity: 0, x: 150 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7 },
    },
  };

  return (
    <div className="w-full md:max-w-[100%] lg:max-w-[90%] bg-white rounded-lg shadow-md p-4 mb-6">
      <motion.h2
        className="text-xl font-semibold text-gray-700 mb-4"
        initial="hidden"
        animate="visible"
      >
        New Todo
      </motion.h2>

      <motion.input
        type="text"
        placeholder="Title"
        maxLength={30}
        value={newTodo.title}
        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      />

      <motion.textarea
        placeholder="Description"
        value={newTodo.description}
        maxLength={100}
        onChange={(e) =>
          setNewTodo({ ...newTodo, description: e.target.value })
        }
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        variants={descVariants}
        initial="hidden"
        animate="visible"
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
