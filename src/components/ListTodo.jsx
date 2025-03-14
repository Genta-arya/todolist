import React, { useState } from "react";
import { FaCheck, FaClock, FaTrash, FaUser } from "react-icons/fa";
import FilterStatus from "./FilterStatus";
import Search from "./Search";
import TrackStatus from "./TrackStatus";
import Modal from "./Modal";
import { motion, AnimatePresence } from "framer-motion";
import { FaPerson } from "react-icons/fa6";
const ListTodo = ({
  todos,
  filteredTodos,
  handleStatusFilter,
  statusFilter,
  handleDelete,
  handleUpdateStatus,
  handleSearch,
  searchTerm,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [selectTodoTitle, setSelectTodoTitle] = useState("");

  const openModal = (todoId, title) => {
    setSelectedTodoId(todoId);
    setSelectTodoTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTodoId(null);
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    handleDelete(selectedTodoId);
    closeModal();
  };
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.5,
      transition: { duration: 0.3 },
    },
  };

  const todoVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  return (
    <div className="w-full md:max-w-[100%] lg:max-w-[90%] bg-white rounded-lg shadow-md p-4">
      <div className="flex lg:flex-row md:flex-row flex-col mb-4 md:mb-4 lg:mb-4 justify-between items-center">
        <div></div>

        <FilterStatus
          todos={todos}
          handleStatusFilter={handleStatusFilter}
          statusFilter={statusFilter}
        />
      </div>

      {todos?.length !== 0 && (
        <Search handleSearch={handleSearch} searchTerm={searchTerm} />
      )}

      {filteredTodos?.length === 0 ? (
        <p className="text-gray-600 text-center">Todos not found</p>
      ) : (
        <ul
          className={`space-y-4 border p-2 rounded-md border-gray-200 ${
            filteredTodos.length > 3 ? "max-h-[300px] overflow-y-auto" : ""
          }`}
        >
          <AnimatePresence>
            {filteredTodos?.map((todo, index) => (
              <motion.li
                key={todo?.id}
                className={`p-4 rounded-lg flex items-start justify-between ${
                  todo?.completed === "1"
                    ? "bg-green-100 border-l-4 border-green-500"
                    : "bg-red-100 border-l-4 border-red-500"
                }`}
                variants={todoVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col">
                  <h2 className="text-base font-semibold">
                    {index + 1}. {todo?.title}
                  </h2>
                  <p className="text-gray-600 text-sm">{todo?.description}</p>
                  <div
                    className={`text-sm font-medium mt-2  ${
                      todo?.completed === "1" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {todo?.completed === "1" ? (
                      <div className="flex items-center space-x-2">
                        <FaCheck />
                        <p>Completed</p>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <FaClock />
                        <p>Pending</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs">
                    <FaUser className="text-gray-500" />
                    <p className="text-gray-500 underline">{todo?.name}</p>
                  </div>
                </div>

                <div>
                  <div className="flex space-x-2 items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={todo?.completed === "1"}
                        onChange={() =>
                          handleUpdateStatus(todo.id, todo.completed)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                    <button
                      onClick={() => openModal(todo.id, todo.title)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      <div>
                        <FaTrash />
                      </div>
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
      {filteredTodos.length > 0 && <TrackStatus todos={todos} />}

      <AnimatePresence>
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {isModalOpen && (
            <Modal
              closeModal={closeModal}
              confirmDelete={confirmDelete}
              title={selectTodoTitle}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ListTodo;
