import React, { useState, useEffect } from "react";
import {
  getData,
  updateStatus,
  createData,
  deleteData,
} from "./API/service/Todolist_Service";
import ModalLoading from "./components/Loading";
import { toast, Toaster } from "sonner";
import { message } from "antd";
import FormTodo from "./components/FormTodo";
import ListTodo from "./components/ListTodo";
import Container from "./components/Container";
import { useUser } from "@clerk/clerk-react";

const App = () => {
  const { user } = useUser();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    author: user.fullName,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchData = async () => {
    try {
      const response = await getData();
      setTodos(response.data);
      setFilteredTodos(response.data);
      setStatusFilter("all");
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
      const matchesSearch = todo.title.toLowerCase().includes(searchTerm);
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
      setNewTodo({ title: "", description: ""  , author: user.fullName});
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
      message.success("Status updated successfully");
      fetchData();
    } catch (error) {
      message.info(error.response.data.message);
      fetchData();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteData(id);
      setTodos(todos.filter((todo) => todo.id !== id));
      message.success("Todo deleted successfully");
      fetchData();
    } catch (error) {
      message.info(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ModalLoading />;

  return (
    <Container>
      <FormTodo
        handleCreate={handleCreate}
        newTodo={newTodo}
        setNewTodo={setNewTodo}
      />
      <ListTodo
        filteredTodos={filteredTodos}
        handleDelete={handleDelete}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        handleStatusFilter={handleStatusFilter}
        statusFilter={statusFilter}
        handleUpdateStatus={handleUpdateStatus}
        todos={todos}
      />

      <Toaster position="bottom-right" richColors />
    </Container>
  );
};

export default App;
