import React, { useState, useEffect } from "react";
import {
  getData,
  updateStatus,
  createData,
  deleteData,
} from "./API/service/Todolist_Service";
import ModalLoading from "./components/Loading";
import { FaCheck, FaClock, FaPlus, FaTrash } from "react-icons/fa";
import { toast, Toaster } from "sonner";
import { message } from "antd";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchData = async () => {
    try {
      const response = await getData();
      setTodos(response.data);
      setFilteredTodos(response.data);
    } catch (error) {
      message.info(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    filterTodos(term, statusFilter);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    filterTodos(searchTerm, status);
  };

  const filterTodos = (searchTerm, status) => {
    const filtered = todos.filter((todo) => {
      const matchesSearch =
        todo.title.toLowerCase().includes(searchTerm) ||
        todo.description.toLowerCase().includes(searchTerm);
      const matchesStatus =
        status === "all" ||
        (status === "completed" ? todo.status : !todo.status);
      return matchesSearch && matchesStatus;
    });
    setFilteredTodos(filtered);
  };

  const handleCreate = async () => {
    if (!newTodo.title || !newTodo.description)
      return toast.info("Title and description are required");

    if (newTodo.title.length < 3)
      return toast.info("Title must be at least 3 characters long");

    if (newTodo.description.length < 5)
      return toast.info("Description must be at least 5 characters long");

    setLoading(true);
    try {
      const response = await createData(newTodo);
      setTodos([...todos, response.data]);
      setNewTodo({ title: "", description: "" });
      message.success("Todo created successfully");
      fetchData();
    } catch (error) {
      message.info(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, currentStatus) => {
    setLoading(true);
    try {
      const response = await updateStatus(id, !currentStatus);
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, status: response.data.status } : todo
        )
      );
      toast.success("Status updated successfully");
      fetchData();
    } catch (error) {
      message.info(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteData(id);
      setTodos(todos.filter((todo) => todo.id !== id));
      fetchData();
    } catch (error) {
      message.info(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ModalLoading />;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      <div className="w-full  md:max-w-[90%] lg:max-w-[90%] bg-white rounded-lg shadow-md p-4 mb-6">
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

      <div className="w-full md:max-w-[90%] lg:max-w-[90%] bg-white rounded-lg shadow-md p-4">
        <div className="flex lg:flex-row md:flex-row flex-col mb-4 md:mb-4 lg:mb-4 justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 lg:mb-0 md:mb-0 ">
            My Todo
          </h2>

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
        </div>

        <div className="flex items-center bg-gray-100 p-2 rounded-lg mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 border outline-none border-gray-300 rounded-lg"
          />
        </div>

        {filteredTodos?.length === 0 ? (
          <p className="text-gray-600 text-center">Todos not found</p>
        ) : (
          <ul
            className={`space-y-4 border p-2 rounded-md border-gray-200 ${
              filteredTodos.length > 3 ? "max-h-[300px] overflow-y-auto" : ""
            }`}
          >
            {filteredTodos?.map((todo, index) => (
              <li
                key={todo?.id}
                className={`p-4 rounded-lg flex items-start justify-between ${
                  todo?.status
                    ? "bg-green-100 border-l-4 border-green-500"
                    : "bg-red-100 border-l-4 border-red-500"
                }`}
              >
                <div>
                  <h2 className="text-base font-semibold">
                    {index + 1}. {todo?.title}
                  </h2>
                  <p className="text-gray-600 text-sm">{todo?.description}</p>
                  <div
                    className={`text-sm font-medium mt-2  ${
                      todo?.status ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {todo?.status ? (
                      <>
                        <div className="flex items-center space-x-2">
                          <FaCheck />
                          <p>Completed</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center space-x-2">
                          <FaClock />
                          <p>Pending</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2 items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={todo?.status}
                      onChange={() => handleUpdateStatus(todo.id, todo.status)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    <div>
                      <FaTrash />
                    </div>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {filteredTodos.length > 0 && (
          <div className="flex justify-center mt-4 font-bold text-sm">
            Completed ( {todos.filter((todo) => todo?.status).length} /{" "}
            {todos.length} )
          </div>
        )}
      </div>

      <Toaster position="bottom-right" richColors />
    </div>
  );
};

export default App;
